/* Ruta: /api/usuarios */
const {check} = require('express-validator');
const {Router} = require('express');
const {getUsers,createUser,updateUser,deleteUser} = require('../controllers/usuarios');
const {validateFields} = require('../middlewares/fieldsValidator');
const { validateToken } = require('../middlewares/validateJWT');
const router = Router();

router.get('/', validateToken ,getUsers);
router.post('/', [
    check('nombre').not().isEmpty(),
    check('password').not().isEmpty(),
    check('email').isEmail(),
    validateFields
] ,createUser);
//reciviendo el parametro id
router.put('/:id', [
    check('nombre', 'property nombre is required').not().isEmpty(),
    check('email','property email is required').isEmail(),
    check('role','property role is required'),
    validateFields
] ,updateUser);

router.delete('/:id',deleteUser);
module.exports = router;