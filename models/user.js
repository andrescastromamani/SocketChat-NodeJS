const {Schema, model} = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: [true,'El nombre es Obligatorio']
    },
    email: {
        type: String,
        required: [true,'El email es Obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'El password es Obligatorio']
    },
    image: {
        type: String
    },
    role:{
        type: String,
        required: true,
        emun: ['admin','user']
    },
    status:{
        type: Boolean,
        default:true
    },
    google:{
        type: Boolean,
        default:false
    }
});

userSchema.methods.toJSON = function () {
    const {password,__v,_id,...user} = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('User', userSchema);