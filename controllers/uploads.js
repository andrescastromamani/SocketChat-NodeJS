const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

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

const updateImageCloudinary = async (req, res) => {
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

    }
    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    model.image = secure_url;
    await model.save();
    res.json({ model });
}

const getImage = async (req, res) => {
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
            return res.sendFile(filePath);
        }
    }
    const filePathImage = path.join(__dirname, '../assets', 'no-image.jpg');
    return res.sendFile(filePathImage);
}

module.exports = {
    uploadFiles,
    updateImage,
    getImage,
    updateImageCloudinary
}