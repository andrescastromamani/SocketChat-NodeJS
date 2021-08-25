const path = require('path');
const fs = require('fs');

const { fileUpload } = require("../helpers");
const { User, Product } = require("../models");


const uploadFiles = async (req, res) => {
    try {
        //Images
        const fileName = await fileUpload(req.files, undefined, 'images');
        //files
        //const fileName = await fileUpload(req.files, ['md', 'txt', 'pdf'], 'files');
        res.json({ fileName })
    } catch (error) {
        res.status(400).json(error);
    }
}

const updateImage = async (req, res) => {
    const { collection, id } = req.params;
    let model;
    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                res.status(400).json({ message: 'User not exist' });
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                res.status(400).json({ message: 'Product not exist' });
            }
            break;
        default:
            res.status(500).json({ message: 'Error Server' });
    }
    //Clear Files
    if (model.image) {
        //Delete File
        const filePath = path.join(__dirname, '../uploads', collection, model.image);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
    const name = await fileUpload(req.files, undefined, collection);
    model.image = name;
    await model.save();
    res.json({ model });
}

module.exports = {
    uploadFiles,
    updateImage
}