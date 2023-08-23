const express = require('express');
const controller = require('../controllers/home_controller.js')
const router =express.Router();

router.get('/',controller.home);

// router.use('/user',require('./users.js'));
router.use('/user',require('./users.js'))


module.exports = router;