const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy; // import jwt strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;  // this module help us extract jwt from header
const User = require('../models/user');  // using Jwt ,identife user so import user

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),//this method creates a new extractor that looks for the JWT in the authorization header with the scheme 'bearer'.
    secretOrKey: 'codial',
}

passport.use(new jwtStrategy(opts, function(jwt_payload, done) {
    
    User.findById(jwt_payload._id)
    .then(user=>{
   if(user){
    return done(null,user)
   }else{
    return done(null,false)
   }
    }).catch(err=>{
        console.log('Error in finding user from jwt');
        return;
    })
}));


module.exports = passport;