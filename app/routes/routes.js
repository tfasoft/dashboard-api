const express = require('express');

const controllers = require('../controllers/controllers');

const router = express.Router();

router.get('/', controllers.index); // Route index

module.exports = router;