const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const getUsers = (req, res) => {
    const {nombre='not Name ', apellido} = req.query
    res.json({
        message: 'Hello from the server Controller get',
        nombre,
        apellido
    })
}
const postUsers = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    const {name, email, password, role} = req.body
    const user = new User({name, email, password, role});
    //Verify unique user
    const emailExist = await User.findOne({email: email});
    if (emailExist) {
        return res.json({
            message: 'Email already exist'
        })
    }
    //Bcrypt password
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt);
    user.save();
    res.json({
        user
    })
}
const putUsers = (req, res) => {
    const id = req.params.id
    res.json({
        message: 'Hello from the server Controller put',
        id
    })
}
const deleteUsers = (req, res) => {
    res.json({
        message: 'Hello from the server Controller delete'
    })
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
}