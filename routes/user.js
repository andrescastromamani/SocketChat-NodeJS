const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, postUsers, putUsers, deleteUsers } = require('../controllers/users');
const { roleValidate, emailExist, idExist } = require('../helpers/db-validations');
const { validateFields } = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');
const { validateRole } = require('../middlewares/validate-role');

const router = Router();

router.get('/', getUsers)

router.post('/', [
    check('name', 'name is required').notEmpty(),
    check('password', 'password is required and length min 6').isLength({ min: 6 }),
    check('email', 'email is not valid').isEmail(),
    check('email').custom(emailExist),
    //check('role','role is not valid').isIn(['admin','user']),
    check('role').custom(roleValidate),
    validateFields
], postUsers)

router.put('/:id', [
    check('id', 'id is not valid').isMongoId(),
    check('id').custom(idExist),
    check('role').custom(roleValidate),
    validateFields
], putUsers)

router.delete('/:id', [
    validateJWT,
    //verifyAdminRole,
    validateRole('admin','master'),
    check('id', 'id is not valid').isMongoId(),
    check('id').custom(idExist),
    validateFields
], deleteUsers)

module.exports = router;