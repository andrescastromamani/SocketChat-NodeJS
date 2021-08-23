const path = require('path');
const { v4: uuidv4 } = require('uuid');

const fileUpload = (files, validExtensions = ['jpg', 'jpeg', 'png', 'gif'], folder = '') => {
    return new Promise((resolve, reject) => {
        const { file } = files;
        const cortName = file.name.split('.');
        const extension = cortName[cortName.length - 1];

        //Validate extension
        if (!validExtensions.includes(extension)) {
            return reject(`Invalid file type, extension valid : ${validExtensions}`);
        }
        const fileName = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', folder, fileName);

        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve(fileName);
        });
    });
};

module.exports = {
    fileUpload
};