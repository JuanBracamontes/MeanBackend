const {Router} = require('express');
const {check} = require('express-validator');
const { validateFields } = require('../middlewares/field-validator');
const { createPatient, setHistoryPatient, getPatients } = require('../controllers/patientController');

/* route: /api/patients */

const router = Router();

router.post('/createPatient', [
    check('name').not().isEmpty(),
    check('dateOfBirth').not().isEmpty(),
    check('nss').not().isEmpty(),
    check('age').not().isEmpty(),
    validateFields
] ,createPatient);

router.post('/addHistoryPatient',[
    check('description').not().isEmpty(),
    check('date').not().isEmpty(),
    check('doctorId').not().isEmpty(),
    check('patientId').not().isEmpty(),
    
],setHistoryPatient)

router.get('/',getPatients);

module.exports = router;