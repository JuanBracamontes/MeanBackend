/* Ruta: /api/upload */
const {Router} = require('express');
const {fileUpload,getImage} = require('../controllers/upload');
const { validateToken } = require('../middlewares/validateJWT');

const router = Router();

router.put('/:folder/:id', [
    validateToken
],fileUpload)

router.get('/:folder/:idImg',[
    validateToken
],getImage)

module.exports = router;