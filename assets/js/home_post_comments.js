// let's implement this via calsses

// this class would be initialized for every post on the page
// 1. when the page loads
// 2. Creation of every post dynamically via AJAX

class PostComments {
    // constructor is used to initialized the instance of the class whenever a new instance is created
    constructor(postId) {
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comment-form`);
        this.createComment(postId);
        let self = this;
        $(' .delete-comment-button',this.postContainer).each(function(){
            self.deleteComment($(this));
        })
    }

    // method to create a delete in DOM
    createComment(postId) {
        let pSelf = this;
        //  console.log(pSelf)
        this.newCommentForm.submit(function (e) {
            e.preventDefault();
            let self = this;
            //  console.log(self)
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function (data) {
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    // console.log(newComment)
                    $(`#post-comment-${postId }`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));
                       //add noty
                       new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();


                }, error: function (error) {
                    console.log(error.responseText);
                }
            })
        })
    }

    

    newCommentDom = function(comment){
        return $(`<li  id="comment-${comment._id}">
       
    <p >
      
           <small>
               <a class="delete-comment-button" href="/comments/destroy/${ comment._id}">X</a>
           </small>
          
      
           ${ comment.content }
    </p>
    
    <small>
       
    ${ comment.user.name }
    </small>
    
    </li>`)
    }

    // method to DELETE a comment in DOM
    deleteComment(deleteLink) {
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success:function(data){
                    // console.log(data.data.comment_id)
                    $(`#comment-${data.data.comment_id}`).remove();
                    //add noty
                    new Noty({
                        theme: 'relax',
                        text: "Comment deleted!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();

                }, error: function (error) {
                    console.log(error.responseText);
                }
            })
        })
     } 
    

}