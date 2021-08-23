
const dbValidations = require('./db-validations');
const generateJWT = require('./generate-jwt');
const googleVerify = require('./google-verify');
const fileUpload = require('./file-upload');

module.exports = {
    ...dbValidations,
    ...generateJWT,
    ...googleVerify,
    ...fileUpload,
}