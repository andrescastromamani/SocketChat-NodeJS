const jsonwebtoken = require('jsonwebtoken');

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

module.exports = {
    generateJwt
}