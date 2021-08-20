const { Router } = require('express');
const { check } = require('express-validator');
const { createCategory, getCategories, updateCategory, getCategory, deleteCategory } = require('../controllers/categories');
const { idExistCategory } = require('../helpers/db-validations');
const { validateFields } = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');
const { verifyAdminRole } = require('../middlewares/validate-role');

const router = Router();

//Get all categories
router.get('/', getCategories)

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
], deleteCategory)


module.exports = router;