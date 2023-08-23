const express = require('express');
const controller = require('../controllers/home_controller.js')
const router =express.Router();

router.get('/',controller.home);

module.exports = router;