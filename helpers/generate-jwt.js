const jsonwebtoken = require('jsonwebtoken');
const { User } = require('../models/');

const generateJwt = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(token);
            }
        });
    })
}
const tryJWT = async (token = '') => {
    try {
        if (token.length < 10) {
            return null;
        }
        const { uid } = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(uid);
        if (user && user.status) {
            return user;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}
module.exports = {
    generateJwt,
    tryJWT
}