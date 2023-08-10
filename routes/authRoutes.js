const {Router} = require('express');
const {login} = require('../controllers/authController');
const {check} = require('express-validator');
const { validateFields } = require('../middlewares/field-validator');

const router = Router();

router.post('/login',[
    check('email','Email is required').not().isEmpty().isEmail(),
    check('password','Password is required').not().isEmpty(),
    validateFields
], login);

module.exports = router;