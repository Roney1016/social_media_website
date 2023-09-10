const User = require('../models/user');

module.exports.userProfile = async function (req, res) {
    console.log(req.params.id)
    console.log(typeof (req.param.id))

    try {

        const user = await User.findById(req.params.id)
        return res.render('profile', { title: 'profile page', profile_user: user })

    } catch (err) {

        console.error('Error:', err);
        return res.status(500).send('Internal Server Error');
    }


}

module.exports.update = function (req, res) {
    if (req.user.id == req.params.id) {
        const userId = req.params.id;
        User.findByIdAndUpdate(userId, req.body)
            .then(data => {
                return res.redirect('back');
            }).catch(err => { console.log("error", err) })
    } else {
        return res.status(401).send('unauthorized')
    }
}

module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {      //if user logged in then he is not asscess sign up page , redirect the profile page
        return res.redirect('/')
    }
    return res.render('user_sign_up', { title: 'sign up' })
}

module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {       //if user logged in then he is not asscess sign up page , redirect the profile page
        return res.redirect('/')
    }
    return res.render('user_sign_in', { title: 'sign in' });
}

module.exports.create = async function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back')
    }

    // User.find({email:req.body.email},function(err,user){ //
    //     if(err){
    //         console.log('error in finding user while signing up')
    //         return;
    //     }
    //     if(!user){ // if new user then create user
    //         User.create(req.body,function(err,user){
    //             if(err){
    //                 console.log('error in creating user while signing up ');return;
    //             }

    //             return res.redirect('user/sign_in')
    //         })
    //     }else{  // if user is already exit 
    //         return res.redirect('back')
    //     }
    // })

    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (!existingUser) {
            const newUser = await User.create(req.body);
            return res.redirect('/user/sign_in');
        } else {

            return res.redirect('back');
        }
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Internal Server Error');
    }
}
// sign in and create a session for the user
module.exports.createSession = function (req, res) {

    req.flash('success','logged in successfully')
    return res.redirect('/')
    // return res.redirect('/')


}
module.exports.destroySession = function (req, res) {
    
    req.logout(req.user,(err) => {
        if(err){
           console.log(err);
           return 
        }
        req.flash('success','you have logged out ');

        return res.redirect('/')
    });
   
}
