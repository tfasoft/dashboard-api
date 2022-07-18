const express = require('express');

const controllers = require('../controllers/ChangeControllers');

const router = express.Router();

router.post('/name', controllers.changeName); // Route change name
router.post('/password', controllers.changePassword); // Route change password
router.post('/username', controllers.changeUsername); // Route change username

module.exports = router;