/* Ruta: /api/hospitales */
const {check} = require('express-validator');
const {Router} = require('express');
const { validateFields } = require('../middlewares/fieldsValidator');
const { validateToken } = require('../middlewares/validateJWT');
const { getAllHospitals, createHospital,updateHospital,deleteHospital, getHospitalById } = require('../controllers/hospitales');
const { onlyAdminPolicy } = require('../middlewares/Policies/policiesJWT');

const router = Router();

router.get('/', [
    validateToken,
    onlyAdminPolicy
],getAllHospitals)

router.get('/:id', [
    validateToken,
    onlyAdminPolicy
],getHospitalById)

router.post('/', [
    validateToken
],createHospital)

router.put('/:id', [
    validateToken
],updateHospital)

router.delete('/:id', [
    validateToken
],deleteHospital)

module.exports = router;