const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const getUsers = (req, res) => {
    const { nombre = 'not Name ', apellido } = req.query
    res.json({
        message: 'Hello from the server Controller get',
        nombre,
        apellido
    })
}
const postUsers = async (req, res) => {

    const { name, email, password, role } = req.body
    const user = new User({ name, email, password, role });

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