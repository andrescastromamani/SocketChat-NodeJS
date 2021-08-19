const { Router } = require('express');
const { check } = require('express-validator');
const { createCategory } = require('../controllers/categories');
const { validateFields } = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');

const router = Router();

//Get all categories
router.get('/',(req, res) => {
    res.json('get categories');
})
//Get category by id
router.get('/:id',(req, res) => {
    res.json('get category by id');
})
//Add category
router.post('/',[
    validateJWT,
    check('name','The name is required').not().isEmpty(),
    validateFields
],createCategory)
//Update category
router.put('/:id',(req, res) => {
    res.json('Update category');
})
//Get all categories
router.delete('/:id',(req, res) => {
    res.json('delete category');
})


module.exports = router;