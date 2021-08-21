const Role = require('../models/role');
const User = require('../models/user');
const Category = require('../models/category');
const { Product } = require('../models');

const roleValidate = async (role = '') => {
    const roleExist = await Role.findOne({ role });
    if (!roleExist) {
        throw new Error(`Role ${role} not exist`);
    }
}

const emailExist = async (email = '') => {
    //Verify unique user
    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
        throw new Error(`Email ${email} already exist`);
    }
}
const idExist = async (id) => {
    //Verify id exist
    const idExist = await User.findById(id);
    if (!idExist) {
        throw new Error(`id ${id} not exist`);
    }
}
const idExistCategory = async (id) => {
    const idExist = await Category.findById(id);
    if (!idExist) {
        throw new Error(`id ${id} not exist`);
    }
}
const idExistProduct = async (id) => {
    const idExist = await Product.findById(id);
    if (!idExist) {
        throw new Error(`id ${id} not exist`);
    }
}
module.exports = {
    roleValidate,
    emailExist,
    idExist,
    idExistCategory,
    idExistProduct
}