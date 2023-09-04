const Post = require('../models/post');
const Comment = require('../models/comment')
module.exports.create = function (req, res) {
    Post.create({ content: req.body.content, user: req.user._id })
        .then(data => {
            return res.redirect('back');
        }).catch(err => {
            console.log('error in creating a post')
            return;
        })
}


// for deleting post(Authorized)

module.exports.destroy = async function (req, res) {
    try {
        const post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {  //  .id means converting the object id into string

           post.deleteOne();
           
            Comment.deleteMany({ post: req.params.id })
                .then(data => { console.log('post delete') })
                .catch(err => { console.log(`error in deleting post ${err}`) })

            return res.redirect('back')
        } else {
            return res.redirect('back')
        }
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Internal Server Error');
    }

}