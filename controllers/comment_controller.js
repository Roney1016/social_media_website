const Comment = require('../models/comment');
const Post = require('../models/post');
const post = require('../models/post');

module.exports.create = async function (req, res) {
   try{
    let post = await Post.findById(req.body.post)
       
            if (post) {
               let comment = await Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                });
                    
                        post.comments.push(comment);
                        post.save();
                       await comment.populate('user','name')
                        if(req.xhr){
                            console.log('hrx request')
                            return res.status(200).json({
                                data:{comment: comment
                                },message: 'comment created'
                            })
                        }
                        req.flash('success','Comment created !')
                        return res.redirect('/')
                   
                  
            }
   }catch(error){
    console.error('Error:', err);
    return res.status(500).send('Internal Server Error');
   }

       

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