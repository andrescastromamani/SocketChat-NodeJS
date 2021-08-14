const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, postUsers, putUsers, deleteUsers } = require('../controllers/users');

const router = Router();

router.get('/', getUsers)
router.post('/',[check('email','email is not valid').isEmail()], postUsers)
router.put('/:id', putUsers)
router.delete('/', deleteUsers)

module.exports = router;