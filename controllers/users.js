const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const getUsers = async (req, res) => {
    //const { nombre = 'not Name ', apellido } = req.query
    const { limit = 5, from = 0 } = req.query;
    const query = {status: true};

    /*const users = await User.find()
        .skip(Number(from))
        .limit(Number(limit));*/
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])
    res.json({ total, users })
}
const postUsers = async (req, res) => {

    const { name, email, password, role } = req.body
    const user = new User({ name, email, password, role });

    //Bcrypt password
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt);
    user.save();
    res.json(user)
}
const putUsers = async (req, res) => {
    const { id } = req.params;
    const { _id, password, email, google, ...rest } = req.body;
    //validate with database
    if (password) {
        //encrypt password
        const salt = bcryptjs.genSaltSync(10);
        rest.password = bcryptjs.hashSync(password, salt);
    }
    const user = await User.findByIdAndUpdate(id, rest);
    res.json(user)
}
const deleteUsers = async(req, res) => {
    const {id} = req.params;
    //delete user completly
    //const user = await User.findByIdAndRemove(id);
    const user = await User.findByIdAndUpdate(id,{status: false});
    const userAuth = req.user;
    res.json({
        user,
        userAuth
    })
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
}