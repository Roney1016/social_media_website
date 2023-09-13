const Post = require('../models/post');
const User = require('../models/user');


module.exports.home = function (req, res) {
    // console.log(req.cookies);
    // res.cookie('user_id',25);


    //  Post.find({})
    //  .then(posts=>{
    //     return res.render('home', { title: 'home' , posts:posts})
    //  })

    //   populate the user of each post
    Post.find({}) 
    .sort('-createdAt')    // for post sort on display (accoding to time)
     .populate({
        path: 'user', // Populate the user field of each post
    })
        .populate({
            path: 'comments',    //Populate the comment field of each post
            populate: {
                path: 'user',  //Populate the user field of each comment
                model: 'User'
            }
        })
        .exec()
        .then(posts => {
            User.find({})
                .then(users => {
                    return res.render('home', { title: 'home', posts: posts, all_users: users });
                })

        })

}