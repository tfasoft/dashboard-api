const express = require('express');

const controllers = require('../controllers/controllers');

const router = express.Router();

router.get('/', controllers.index); // Route index
router.post('/login', controllers.loginAdmin); // Route login admin
router.post('/register', controllers.registerAdmin); // Route register admin
router.post('/get/admin', controllers.getAdmin); // Route get admin

module.exports = router;