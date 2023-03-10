/* Ruta: /api/auth */
const {check} = require('express-validator');
const {Router} = require('express');
const { validateFields } = require('../middlewares/fieldsValidator');
const {login, renewToken, googleSignIn} = require('../controllers/auth');
const { validateToken } = require('../middlewares/validateJWT');

const router = Router();

router.post('/', [
    check('password').not().isEmpty(),
    check('email').isEmail(),
    validateFields
],login)

router.post('/google',
[
    check('token','Token not provided').not().isEmpty(),
    validateFields
]
,googleSignIn)

router.get('/renewToken',
[
    validateToken
]
,renewToken)

module.exports = router;