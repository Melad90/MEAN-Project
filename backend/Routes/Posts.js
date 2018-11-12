const express = require('express');
const routes = express.Router();
const multer = require('multer');
const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');
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

routes.post('', checkAuth, multer({storage: storage}).single('image'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
        rubrik: req.body.rubrik,
        ingress: req.body.ingress,
        innehall: req.body.innehall,
        imagePath:  url + '/images/' + req.file.filename,
        creator: req.userData.userId
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
    })
    .catch(error => {
        res.status(500).json({
            message: 'Skapandet av post misslyckades!'
        }); 
    });
});

routes.put('/:id', checkAuth, multer({storage: storage}).single('image'), (req, res, next) => {
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
        imagePath: imagePath,
        creator: req.userData.userId
    });
    Post.updateOne({_id: req.params.id, creator: req.userData.userId }, post).then(result => {
        if (result.nModified > 0 ){
            res.status(200).json({message: 'Update Successful!'});
        } else {
            res.status(401).json({message: 'Not Authorized!'});
        }
    })
    .catch(error => {
        res.status(500).json({
            message: 'kunde inte uppdatera post!'
        });
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
    .catch(error => {
        res.status(500).json({
            message: 'Fetching posts failed!'
        });
    });
});

routes.get('', (req, res, next) => {
    Post.find().sort({rubrik: -1}).then(documents => {
        res.status(200).json({
            message: 'Posts fetched succesfully!',
            posts: documents
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Fetching posts failed!'
        });
    });
});

routes.delete('/:id', checkAuth, (req, res, next) => {
    Post.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
        if (result.n > 0 ) {
            res.status(200).json({message: 'Deletion success!'});
        } else {
            res.status(401).json({message: 'Not Authorized!'});
        }
    })
    .catch(error => {
        res.status(500).json({
            message: 'Fetching posts failed!'
        });
    });
});

module.exports = routes;