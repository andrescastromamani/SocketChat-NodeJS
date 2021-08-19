const { Router } = require('express');
const { check } = require('express-validator');
const { createCategory, getCategories, updateCategory } = require('../controllers/categories');
const { idExistCategory } = require('../helpers/db-validations');
const { validateFields } = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');

const router = Router();

//Get all categories
router.get('/', getCategories)
//Get category by id
router.get('/:id', (req, res) => {
    res.json('get category by id');
})
//Add category
router.post('/', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    validateFields
], createCategory)
//Update category
router.put('/:id', [
    check('id', 'id is not valid').isMongoId(),
    check('id').custom(idExistCategory),
    validateFields
], updateCategory)
//Get all categories
router.delete('/:id', (req, res) => {
    res.json('delete category');
})


module.exports = router;