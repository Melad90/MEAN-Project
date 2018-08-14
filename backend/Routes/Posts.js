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
        let today = new Date();
        let dd = today.getDate(),
            mm = today.getMonth(),
            yyyy = today.getFullYear(),
            HH = today.getHours(),
            MM = today.getMinutes();
        if(dd<10){
            dd='0'+mm;
        }
        if(mm<10){
            mm='0'+mm;
        }
        today = dd+'-'+mm+'-'+yyyy+'-'+HH+'-'+MM;
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + today + '.' + ext);
    }
});

routes.post('', multer({storage: storage}).single('image'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
        rubrik: req.body.rubrik,
        ingress: req.body.ingress,
        innehall: req.body.innehall,
        imagePath:  url + '/images/' + req.file.filename
    });
    post.save().then(result => {
        res.status(201).json({
            message: 'perfect!',
            post: {
                id: result._id,
                rubrik: result.rubrik,
                ingress: result.ingress,
                innehall: result.innehall,
                imagePath: result.imagePath
            }
        });
    });
});

routes.put('/:id', multer({storage: storage}).single('image'), (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        imagePath = url + '/images/' + req.file.fieldname;
    }
    const post = new Post({
        _id: req.body.id,
        rubrik: req.body.rubrik,
        ingress: req.body.ingress,
        innehall: req.body.innehall,
        imagePath: imagePath
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