const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
},
    function (email, password, done) {
        //find a user and establish the identity
        console.log('config/p-l-s')
        User.findOne({ email: email })
            .then(user => {
                if (!user || user.password != password) {
                    console.log('Invalid Username/Password');
                    return done(null, false);
                }

                return done(null, user);

            }).catch(err => {
                console.log('Error in finding user -->Passport');
                return done(err);
            })
    }

));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    console.log('serializeUser')
    done(null, user.id);
})



//deserializing the user from the key in the cookies

passport.deserializeUser(function (id, done) {
    
  console.log('deserializeUser')
    User.findById(id)
        .then(user => {
            return done(null, user);
        }).catch(err => {
            console.log('Error in finding user -->Passport');
            //         return done(err);
        })
});

module.exports = passport;