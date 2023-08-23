const User = require('../models/user');
module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', { title: 'sign up' })
}