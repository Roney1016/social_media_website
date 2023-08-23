const express = require('express');
const controller = require('../controllers/user_controller.js')
const router =express.Router();

router.get('/sign_up',controller.signUp)  //render sign up page



module.exports = router