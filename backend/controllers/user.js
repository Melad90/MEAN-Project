const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then( hash => {
        const user = new User({
            email: req.body.email,
            password: hash,
            Name: req.body.Name
        });
        user.save().then( result => {
            res.status(201).json({
                message: 'User created!',
                result: result
            });
        })
        .catch(err =>{
            res.status(500).json({
                message: 'ogiltiga autentiseringsuppgifter!'
            });
        });
    });
}

exports.Login = (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email})
    .then(user => {
        if(!user) {
            return res.status(401).json({
                message: 'Login Failed!   !user'
            });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
        if(!result) {
            return res.status(401).json({
                message: 'login Failed!  !result'
            });
        }
        const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id, Name: fetchedUser.Name}, 'this_is_my_token', {expiresIn: '1h'});
        res.status(200).json({
            token: token,
            expiresIn: 3600,
            userId: fetchedUser._id
        });
    })
    .catch(err => {
        return res.status(401).json({
            message: 'ogiltiga autentiseringsuppgifter!'
        });
    })
}