const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://marnarsay-cosomo:w7voq67w8mXwceKO21EZZz2eOSJVucwOFzygdiHw6wIrz4ypPcqYJasaWfKVRX1KPKcL73AgRyudHa0AaXN5gg%3D%3D@marnarsay-cosomo.documents.azure.com:10255/Posts-test?ssl=true')
.then(() =>{
    console.log('Connected to BD');
})
.catch(() => {
    console.log('Connection failed');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post('/api/posts', (req, res, next) => {
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

app.get('/api/posts', (req, res, next) => {
    Post.find().then(documents => {
        res.status(200).json({
            message: 'Posts fetched succesfully!',
            posts: documents
        });
    });
});

app.delete('/api/posts/:id', (req, res, next) => {
    Post.deleteOne({_id: req.params.id}).then(result => {
        res.status(200).json({message: 'Post deleted'});
    });
});

module.exports = app;