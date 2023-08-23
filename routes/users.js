const express = require('express');
const controller = require('../controllers/user_controller.js')
const router =express.Router();

router.get('/sign_up',controller.signUp)  //render sign up page

router.get('/sign_in',controller.signIn);  // render sign in page 

router.post('/create',controller.create)   // create new user


module.exports = router