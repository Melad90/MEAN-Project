const express = require('express');
const routes = express.Router();
const Post = require('../models/post');


routes.post('', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
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
        title: req.body.title,
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
    })
})

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