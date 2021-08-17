const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
    try {
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: 'Token not valid'
        });
    }
    console.log(token);
}

module.exports = validateJWT;