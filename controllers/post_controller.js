const Post = require('../models/post');
const Comment = require('../models/comment')
module.exports.create = async function (req, res) {
try{
   let post = await Post.create({ content: req.body.content, user: req.user._id });
         

            if(req.xhr){
                // for ajax request
                
                await post.populate('user','name')
                return res.status(200).json({
                    data:{
                        post:post
                    },
                    message:"post created"
                })

            }
            req.flash('success','post is published !')
            return res.redirect('back');
        } catch(error) {
            req.flash('error',error)
            console.log('error in creating a post')
            return;
        }
}


// for deleting post(Authorized)

module.exports.destroy = async function (req, res) {
    try {
        const post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {  //  .id means converting the object id into string

           post.deleteOne();
           
          await Comment.deleteMany({ post: req.params.id })
           
              if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message: 'post deleted'
                })
              }
                    
                    
                  
                
                req.flash('success','post and associated comments deleted !')
            return res.redirect('back')
        } else {
            return res.redirect('back')
        }
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Internal Server Error');
    }

}