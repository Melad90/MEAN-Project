const express = require('express');
const routes = express.Router();
const multer = require('multer');
const Post = require('../models/post');
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error =  new Error('Invalid mime type');
        if (isValid) {
            error = null;
        }
        cb(error, "backend/images")
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});

routes.post('', multer({storage: storage}).single('image'), (req, res, next) => {
    const post = new Post({
        rubrik: req.body.rubrik,
        ingress: req.body.ingress,
        innehall: req.body.innehall
    });
    post.save().then(result => {
        res.status(201).json({
            message: 'perfect!',
            postId: result._id
        });
    });
});

routes.put('/:id', (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        rubrik: req.body.rubrik,
        ingress: req.body.ingress,
        innehall: req.body.innehall
    });
    Post.updateOne({_id: req.params.id}, post).then(result => {
        res.status(200).json({message: 'Update Successful!'});
    });
});

routes.get('/:id', (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message: 'Post not found!'});
        }
    });
});

routes.get('', (req, res, next) => {
    Post.find().then(documents => {
        res.status(200).json({
            message: 'Posts fetched succesfully!',
            posts: documents
        });
    });
});

routes.delete('/:id', (req, res, next) => {
    Post.deleteOne({_id: req.params.id}).then(result => {
        res.status(200).json({message: 'Post deleted'});
    });
});

module.exports = routes;