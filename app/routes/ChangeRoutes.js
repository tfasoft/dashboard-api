const express = require('express');

const controllers = require('../controllers/ChangeControllers');

const router = express.Router();

router.post('/name', controllers.changeName); // Route login admin

module.exports = router;