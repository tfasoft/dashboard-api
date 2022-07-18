const express = require('express');

const controllers = require('../controllers/GetDataControllers');

const router = express.Router();

router.post('/admin', controllers.getAdmin); // Route get admin

module.exports = router;