const { Router } = require('express');
const { check } = require('express-validator');

const { uploadFiles, updateImage } = require('../controllers/uploads');
const { permitCollections } = require('../helpers');
const { validateFields } = require('../middlewares/validate-fields');
const validateFile = require('../middlewares/validate-file');

const router = Router();

router.post('/', validateFile, uploadFiles);

router.put('/:collection/:id', [
    validateFile,
    check('collection').custom(c => permitCollections(c, ['users', 'products'])),
    check('id', 'Id is not valid').isMongoId(),
    validateFields
], updateImage)

module.exports = router;