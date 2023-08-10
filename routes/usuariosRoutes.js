const {Router} = require('express');
const {getUsers,createUser,updateUser, deleteUser} = require('../controllers/usuariosController');
const {check} = require('express-validator');
const { validateFields } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

/* Route: api/usuarios */
router.get('/',validateJWT, getUsers);

router.post('/createUser', [
    check('name').not().isEmpty(),
    check('password').not().isEmpty(),
    check('email').not().isEmpty().isEmail(),
    validateFields
] ,createUser);

router.put('/updateUser/:uid', [
    validateJWT,
    check('name').not().isEmpty(),
    check('email').not().isEmpty().isEmail(),
    validateFields
] ,updateUser);

router.delete('/deleteUser/:uid',validateJWT,deleteUser);


module.exports = router;