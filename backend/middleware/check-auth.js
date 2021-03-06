const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'this_is_my_token');
        req.userData = { email: decodedToken.email, userId: decodedToken.userId, Name: decodedToken.Name };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Du är inte autentiserad!'});
    }
};