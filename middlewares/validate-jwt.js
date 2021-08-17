const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async(req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
    try {
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(uid);
        if (!user) {
            return res.status(401).json({
                message: 'Token not valid - user not exist in db'
            })
        }
        if (user.status === false) {
            return res.status(401).json({  
                message: 'Token not valid - user is not active'
            })
        }
        req.user = user;
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