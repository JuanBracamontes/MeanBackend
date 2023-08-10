const {Router} = require('express');
const {check} = require('express-validator');
const { validateFields } = require('../middlewares/field-validator');
const { createStatus, getStatus } = require('../controllers/statusController');

const router = Router();

/* Route: api/status */
router.get('/', getStatus);

// router.get('/autocompleteDoctor/:keyword', autocompleteDoctor);

router.post('/createStatus', [
    check('name').not().isEmpty(),
    check('representsDanger').not().isEmpty(),
    validateFields
] ,createStatus);

module.exports = router;