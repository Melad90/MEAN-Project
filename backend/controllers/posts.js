const Post = require('../models/post');

/*Post.findOne().populate('creator').exec(function(err, c) {
    if (err) { return console.log(err); }

    console.log(c.creator.Name);
});*/
exports.createPost = (req, res, next) => {
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
}

exports.updatePost = (req, res, next) => {
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
        if (result.n > 0 ){
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
}

exports.getAllPost = (req, res, next) => {
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
}

exports.getSinglePost = (req, res, next) => {
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
}

exports.deletePost = (req, res, next) => {
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
}