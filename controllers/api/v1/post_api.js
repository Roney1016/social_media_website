const Post = require('../../../models/post');
const Comment = require('../../../models/comment')
module.exports.index = async function(req,res){

    let posts = await Post.find({}) 
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
        });
       
    return res.status(200).json({
        message:'list of posts',
        posts:posts
    })
}

module.exports.destroy = async function (req, res) {
    try {
        const post = await Post.findById(req.params.id);
       

           post.deleteOne();
           
          await Comment.deleteMany({ post: req.params.id });

          return res.status(200).json({
            message: 'post and associated comments deletedsuccessfully'
          })
           
    } catch (err) {
        
        return res.status(500).json('Internal Server Error');
    }

}