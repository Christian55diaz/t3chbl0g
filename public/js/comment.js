//this function allows the comment section and handlebars to work
async function commentFormHandler(event) {
    event.preventDefault();
    // with the blog post i didn't want to be searching and searching for a blog post
    //so for this function is that an id will be taken and the link adress would showup as whatever blogpost you are on.
    const blogpost_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
      ];
      //logging the blogpost id
      console.log(blogpost_id);
      //if statement for comment_text
      if (comment_text) {
        const response = await fetch("/api/comments", {
          method: "POST",
          body: JSON.stringify({
            blogpost_id,
            comment_text,
          }),
          //headers json
          headers: {
            "Content-Type": "application/json",
          },
        });
        //if the comment is too long we give them an alert saying comment is too long
        if (response.ok) {
            document.location.reload();
          } else {
            alert(
              "Your comment might be a little too long for this site try shortening it :). Max characters for a comment is 32"
            );
          }
        }
      }