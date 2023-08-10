const {Router} = require('express');
const {check} = require('express-validator');
const { validateFields } = require('../middlewares/field-validator');
const { createDoctor,getDoctors, autocompleteDoctor } = require('../controllers/doctorsController');

const router = Router();

/* Route: api/usuarios */
router.get('/', getDoctors);

router.get('/autocompleteDoctor/:keyword', autocompleteDoctor);

router.post('/createDoctor', [
    check('firstname').not().isEmpty(),
    check('lastname').not().isEmpty(),
    check('area').not().isEmpty(),
    check('professionalId').not().isEmpty(),
    check('hospital').not().isEmpty().isMongoId(),
    check('email').not().isEmpty().isEmail(),
    validateFields
] ,createDoctor);

module.exports = router;