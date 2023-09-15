// here we create js file for fetch the data from form and send it in JSON formet to the action when ever we are
// submitting the form to create new post it not get submitted automatically it submited via jquery ajax



{
    console.log('hello ajax !')
    // we need to create a function who recieve the data of created post and display it
  // here we are creatign a function who sends the data to the controller action
  // here we are taking id's from form in  home.ejs
  // method to submit the form data for new post using AJAX
    

    //method to submit the form data for new post using ajax
    let createPost = function(){
        // here when the from is submitted we don't want to submitted automatically so we need to use prevent default
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();
            
            // here we are submitting the form manually by ajax
            $.ajax({
                type:'post',
                url: '/posts/create',
                // serialize -this convert the form data into json
                data: newPostForm.serialize(),
                success: function(data){
                          console.log(data);
                        let newPost = newPostDom(data.data.post);
                        $('#post-list-container>ul').prepend(newPost);
                        deletePost($(' .delete-post-button',newPost))
                },error: function(error){
                    console.log(error.responseText)
                }
            });
        });
    }

// method to create a post in DOM

// we need a function which will help us in converting this HTML into JQERY object
  let newPostDom = function(post){
    return $(`<li id="post-${ post._id }">  <!-- why i am add id in list beacuse x on some of time i will also need to delete this post using ajax--> 
    
        <small>
            <a class="delete-post-button" href="/posts/destroy/${post._id} ">X</a>
        </small>
       
    <p>
     ${ post.content}
            <br>
            <small>
            ${post.user.name }
            </small>
    </p>
    <div class="post-comment">
       
            <form action="/comments/create" method="post">
                <input type="text" name="content" placeholder="Type here to add your comment.. " required>
                <input type="hidden" name="post" value="${ post._id }">
                <input type="submit" value="Add comment">
            </form>


            <div class="post-comment-list">
                <ul class="post-comment-${post._id }">
                  
                </ul>
            </div>
     
    </div>
</li>`)
  }

// method to delete a post from Dom

 function deletePost(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault()
       
        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success: function(data){
                
                $(`#post-${data.data.post_id}`).remove();
            },error: function(error){
                console.log(error.responseText)
            }
        })
    })
 }

 // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
 let convertPostsToAjax = function () {
    $('#post-list-container>ul>li').each(function () {
      let self = $(this);
      let deleteButton = $(' .delete-post-button', self);
      deletePost(deleteButton);
     
    });
  }

    createPost();
    convertPostsToAjax();
}