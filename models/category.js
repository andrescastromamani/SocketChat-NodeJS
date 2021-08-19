const {Schema, model} = require('mongoose');

const CategorySchema = Schema({
    name:{
        type: String,
        required: true,
    },
    status:{
        type: Boolean,
        default: true,
        required: true,
    },
    created_at:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

module.exports = model('Category', CategorySchema);