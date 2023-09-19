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
    }


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

                }, error: function (error) {
                    console.log(error.responseText);
                }
            })
        })
    }
    newCommentDom = function(comment){
        return $(`<li  id="comment-${comment._id}">
        <!-- <small>
           <a href="/comments/destroy/${ comment._id }">X</a>
       </small> -->
    <p >
      
           <small>
               <a class="delete-comment-button" href="/comments/destroy/${ comment.id}">X</a>
           </small>
          
      
           ${ comment.content }
    </p>
    
    <small>
       
    ${ comment.user.name }
    </small>
    
    </li>`)
    }
    

}