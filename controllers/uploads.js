const { fileUpload } = require("../helpers");


const uploadFiles = async (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).json('No files were uploaded.');
        return;
    }

    //Images
    const fileName = await fileUpload(req.files);
    res.json({
        fileName
    })
}

module.exports = {
    uploadFiles,
}