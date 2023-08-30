const express = require('express');
const controller = require('../controllers/user_controller.js')
const router =express.Router();

router.get('/profile',controller.profile);   //render profile page

router.get('/sign_up',controller.signUp)  //render sign up page

router.get('/sign_in',controller.signIn);  // render sign in page 

router.post('/create',controller.create)   // create new user and sign up

router.post('/create-session',controller.createSession);     // for sign in 

router.get('/sign_out',controller.signOut);                // for sign out


module.exports = router;