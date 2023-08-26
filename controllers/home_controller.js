const Post = require('../models/post');


module.exports.home = function (req, res) {
    // console.log(req.cookies);
    // res.cookie('user_id',25);


    //  Post.find({})
    //  .then(posts=>{
    //     return res.render('home', { title: 'home' , posts:posts})
    //  })

    //   populate the user of each post
    Post.find({}).populate('user').exec()
    .then(posts=>{
        return res.render('home', { title: 'home' , posts:posts})
    })
    
}