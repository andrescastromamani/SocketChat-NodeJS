const Role = require('../models/role');

const roleValidate = async(role='')=>{
    const roleExist = await Role.findOne({role});
    if(!roleExist){
        throw new Error(`Role ${role} not exist`);
    }
}

module.exports = {
    roleValidate
}