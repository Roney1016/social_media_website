const User = require('../models/user');

module.exports.profile = function (req, res) {
    console.log(req.cookies.user_id)
    const id = req.cookies.user_id;
    
    if (req.cookies.user_id) {    // if some one change and delete the cookies, so check the present or not
        User.findById(id)
            .then(user => {
                if (user) {
                    return res.render('user_profile', { title: 'profile page', user: user })
                } else {
                    return res.redirect('/user/sign_in')
                }

            }).catch(err => {
                console.log(err)

            })

    } else {
        return res.redirect('/user/sign_in');
    }



    // return res.render('user_profile', { title: 'profile page' })
}
module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', { title: 'sign up' })
}

module.exports.signIn = function (req, res) {
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
module.exports.createSession = async function (req, res) {

    // step to authentication
    // find the user
    User.findOne({ email: req.body.email })
        .then(user => {
            //handle user found-----
            if (user) {
                //handle password which doesn't match
                if (user.password != req.body.password) {
                    return res.redirect('back')
                }
                // handle session creation 
                res.cookie('user_id', user.id)
                return res.redirect('/user/profile')
            } else {
                //handle user not found
                return res.redirect('back');
            }
        }).catch(err => {
            console.log('error in finding user in signing in', err);
        });

    //  write second way------------

    // try {
    //     const user = await User.findOne({ email: req.body.email });
    //         if(user){   }

    // } catch (err) {
    //     console.error('Error:', err);
    //     return res.status(500).send('Internal Server Error');
    // }

}
module.exports.signOut = function(req,res){       
    res.clearCookie('user_id');              // clear cookies 
    res.redirect('back')

}