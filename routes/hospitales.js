/* Ruta: /api/hospitales */
const {check} = require('express-validator');
const {Router} = require('express');
const { validateFields } = require('../middlewares/fieldsValidator');
const { validateToken } = require('../middlewares/validateJWT');
const { getAllHospitals, createHospital,updateHospital,deleteHospital } = require('../controllers/hospitales');

const router = Router();

router.get('/', [
    validateToken
],getAllHospitals)

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