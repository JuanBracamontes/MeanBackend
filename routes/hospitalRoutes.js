const {Router} = require('express');
const {check} = require('express-validator');
const { validateFields } = require('../middlewares/field-validator');
const { createHospital, getHospitals } = require('../controllers/hospitalController');

const router = Router();

/* Route: /api/hospitals */
router.get('/', getHospitals);

router.post('/createHospital', [
    check('address').not().isEmpty(),
    check('city').not().isEmpty(),
    //neighbourhood
    check('name').not().isEmpty(),
    check('neighbourhood').not().isEmpty(),
    check('phone').not().isEmpty(),
    check('postcode').not().isEmpty(),
    validateFields
] ,createHospital);

module.exports = router;