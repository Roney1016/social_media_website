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
                        req.flash('success','Comment created !')
                        return res.redirect('/')
                    }).catch(err => { console.log('error in add comment'); return; })
            }
        }).catch(err => { console.log("error in finding post for comment"); return; })

}

// for deleting comment 
module.exports.destroy = async function(req,res){
    try{
        const comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){

            let postId = comment.post;

            comment.deleteOne();
            req.flash('success','Comment deleted !')
            Post.findByIdAndUpdate(postId,{$pull:{comment:req.params.id}})

            .then(data=>{console.log('delete commnet')})
            .catch(err=>{console.log(`error in deleting commnet ${err}`)})
              
            return res.redirect('back');

        }else{
            return res.redirect('back')
        }
    }catch(err){
        console.error('Error:', err);
        return res.status(500).send('Internal Server Error');
    }
       

}