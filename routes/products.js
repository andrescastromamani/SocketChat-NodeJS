const { Router } = require('express');
const { check } = require('express-validator');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/products');
const { idExistProduct, idExistCategory } = require('../helpers/db-validations');
const { validateFields } = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');
const { verifyAdminRole } = require('../middlewares/validate-role');

const router = Router();

//Get all products
router.get('/', getProducts)

//Get Product by id
router.get('/:id', [
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(idExistProduct),
    validateFields,
], getProduct)

//Add Product
router.post('/', [
    validateJWT,
    check('name', 'The name is required').notEmpty(),
    check('category', 'is not id mongo').isMongoId(),
    check('category').custom(idExistCategory),
    validateFields
], createProduct)

//Update category
router.put('/:id', [
    validateJWT,
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(idExistProduct),
    validateFields
], updateProduct) 

//delete categorie
router.delete('/:id', [
    validateJWT,
    verifyAdminRole,
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(idExistProduct),
    validateFields
], deleteProduct)

module.exports = router;