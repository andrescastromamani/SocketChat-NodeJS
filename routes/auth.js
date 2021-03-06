const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, generateToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');

const router = Router();

router.post('/login', [
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').notEmpty(),
    validateFields
], login)
router.post('/google', [
    check('id_token', 'id_token is required').notEmpty(),
    validateFields
], googleSignIn)
router.get('/', validateJWT, generateToken)

module.exports = router;