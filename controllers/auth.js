const bcrypt = require('bcryptjs');
const User = require('../models/user');

const login = async(req, res) => {
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

        res.json({
            message: 'Welcome to the API LOGIN'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error'
        });
    }
}

module.exports = {
    login
}