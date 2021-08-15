const Role = require('../models/role');
const User = require('../models/user');

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

module.exports = {
    roleValidate,
    emailExist
}