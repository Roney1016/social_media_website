const express = require('express');
const passport = require('passport');
const controller = require('../controllers/user_controller.js')
const router =express.Router();

router.get('/profile',passport.checkAuthentication,controller.userProfile);

router.get('/sign_up',controller.signUp)  //render sign up page

router.get('/sign_in',controller.signIn);  // render sign in page 

router.post('/create',controller.create)   // create new user

router.get('/sign_out',controller.destroySession);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/user/sign_in'},
), controller.createSession);


module.exports = router