/* Ruta: /api/auth */
const {check} = require('express-validator');
const {Router} = require('express');
const { validateFields } = require('../middlewares/fieldsValidator');
const {login} = require('../controllers/auth')

const router = Router();

router.post('/', [
    check('password').not().isEmpty(),
    check('email').isEmail(),
    validateFields
],login)

module.exports = router;