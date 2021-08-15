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
const putUsers = async(req, res) => {
    const {id} = req.params;
    const { password, email, google, ...rest } = req.body;
    //validate with database
    if(password){
        //encrypt password
        const salt = bcryptjs.genSaltSync(10);
        rest.password = bcryptjs.hashSync(password, salt);
    }
    const user = await User.findByIdAndUpdate(id, rest);
    res.json({
        message: 'Hello from the server Controller put',
        user
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