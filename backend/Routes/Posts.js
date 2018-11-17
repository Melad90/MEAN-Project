const express = require('express');
const routes = express.Router();
const multer = require('multer');
const postController = require('../controllers/posts');
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

routes.post('', checkAuth, multer({storage: storage}).single('image'), postController.createPost);

routes.put('/:id', checkAuth, multer({storage: storage}).single('image'), postController.updatePost);

routes.get('/:id', postController.getSinglePost);

routes.get('', postController.getAllPost);

routes.delete('/:id', checkAuth, postController.deletePost);

module.exports = routes;