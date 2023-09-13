{
    console.log('hello ajax !')

    //method to submit the form data for new post using ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();
            
            $.ajax({
                type:'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                          console.log(data);
                        let newPost = newPostDom(data.data.post);
                        $('#post-list-container>ul').prepend(newPost)
                },error: function(error){
                    console.log(error.responseText)
                }
            });
        });
    }

// method to create a post in DOM
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

    createPost();
}