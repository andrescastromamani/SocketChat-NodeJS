const { fileUpload } = require("../helpers");


const uploadFiles = async (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).json('No files were uploaded.');
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

module.exports = {
    uploadFiles,
}