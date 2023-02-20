/* Ruta: /api/medicos */
const {check} = require('express-validator');
const {Router} = require('express');
const { validateFields } = require('../middlewares/fieldsValidator');
const { validateToken } = require('../middlewares/validateJWT');
const { createDoctor,getAllDoctors,updateDoctor,deleteDoctor, getDoctorById } = require('../controllers/medicos');

const router = Router();

router.get('/', [
    validateToken
],getAllDoctors)

router.get('/getDoctorById/:id', [
    validateToken
],getDoctorById)

router.post('/', [
    validateToken,
    check('nombre',"The field nombre is required").not().isEmpty(),
    check('hospital',"The field hospital is required").isMongoId(),
    validateFields
],createDoctor)

router.put('/:id', [
    validateToken
],updateDoctor)

router.delete('/:id', [
    validateToken
],deleteDoctor)

module.exports = router;