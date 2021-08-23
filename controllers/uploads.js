const path = require('path');

const uploadFiles = (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).json('No files were uploaded.');
        return;
    }

    const { file } = req.files;

    console.log(file);
    const uploadPath = path.join(__dirname, '../uploads', file.name);

    file.mv(uploadPath, function (err) {
        if (err) {
            return res.status(500).json(err);
        }

        res.json('File uploaded to ' + uploadPath);
    });
}

module.exports = {
    uploadFiles,
}