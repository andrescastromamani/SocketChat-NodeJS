const { fileUpload } = require("../helpers");
const { User, Product } = require("../models");


const uploadFiles = async (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).json({ message: 'No files were uploaded.' });
        return;
    }
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
    let modelo;
    switch (collection) {
        case 'users':
            modelo = await User.findById(id);
            if (!modelo) {
                res.status(400).json({ message: 'User not exist' });
            }
            break;
        case 'products':
            modelo = await Product.findById(id);
            if (!modelo) {
                res.status(400).json({ message: 'Product not exist' });
            }
            break;
        default:
            res.status(500).json({ message: 'Error Server' });
    }
    const name = await fileUpload(req.files, undefined, collection);
    modelo.image = name;
    await modelo.save();
    res.json({ modelo });
}

module.exports = {
    uploadFiles,
    updateImage
}