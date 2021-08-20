const { Router } = require('express');
const { check } = require('express-validator');
const { getProducts } = require('../controllers/products');
const router = Router();

//Get all categories
router.get('/', getProducts)
/*
//Get category by id
router.get('/:id', [
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(idExistCategory),
    validateFields,
], getCategory)

//Add category
router.post('/', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    validateFields
], createCategory)

//Update category
router.put('/:id', [
    validateJWT,
    check('name', 'name is required').notEmpty(),
    check('id').custom(idExistCategory),
    validateFields
], updateCategory)

//Get all categories
router.delete('/:id', [
    validateJWT,
    verifyAdminRole,
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(idExistCategory),
    validateFields
], deleteCategory)*/