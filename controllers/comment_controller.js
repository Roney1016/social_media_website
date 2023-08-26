const Comment = require('../models/comment');
const Post = require('../models/post');
const post = require('../models/post');

module.exports.create = function (req, res) {
    Post.findById(req.body.post)
        .then(post => {
            if (post) {
                Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                })
                    .then(comment => {
                        post.comments.push(comment);
                        post.save();
                        return res.redirect('/')
                    }).catch(err => { console.log('error in add comment'); return; })
            }
        }).catch(err => { console.log("error in finding post for comment"); return; })

}