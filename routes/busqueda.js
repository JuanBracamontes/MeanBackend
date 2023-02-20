/*
    ruta: 'api/busqueda/:palabraclave'
*/
/* Ruta: /api/auth */
const {Router} = require('express');
const {search,getResultsByCollection} = require('../controllers/busqueda.js');
const { validateToken } = require('../middlewares/validateJWT');

const router = Router();

router.get('/:palabraclave', [
    validateToken
],search);

router.get('/collection/:table/:keyword',
validateToken,
getResultsByCollection)

module.exports = router;