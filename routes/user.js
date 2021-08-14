const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, postUsers, putUsers, deleteUsers } = require('../controllers/users');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', getUsers)
router.post('/',[
    check('name','name is required').notEmpty(),
    check('password','password is required and length min 6').isLength({min: 6}),
    check('email','email is not valid').isEmail(),
    check('role','role is not valid').isIn(['admin','user']),
    validateFields
], postUsers)
router.put('/:id', putUsers)
router.delete('/', deleteUsers)

module.exports = router;