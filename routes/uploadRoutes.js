const {Router} = require('express');
const {check} = require('express-validator');
const { validateFields } = require('../middlewares/field-validator');
const { createStatus, getStatus } = require('../controllers/statusController');
const { uploadFile } = require('../controllers/uploadController');

const router = Router();

/* Route: api/upload */

router.post('/uploadFile', [
] ,uploadFile);

module.exports = router;