const bcrypt = require('bcryptjs');
const { generateJwt } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');
const User = require('../models/user');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        //verify user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'Email not found'
            });
        }
        //verify user active
        if (user.status === false) {
            return res.status(400).json({
                message: 'User not active'
            });
        }
        //verify password
        const passwordValid = bcrypt.compareSync(password, user.password);
        if (!passwordValid) {
            return res.status(400).json({
                message: 'password not valid'
            });
        }
        //Generate token
        const token = await generateJwt(user.id);

        res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error'
        });
    }
}

const googleSignIn = async(req, res) => {
    const { id_token } = req.body;
    try {
        const googleUser = await googleVerify(id_token);
        res.json({
            message: 'google sign in',
            googleUser
        });
    } catch (error) {
        res.status(400).json({
            message: 'Token google is not valid'
        });
    }
}
module.exports = {
    login,
    googleSignIn
}