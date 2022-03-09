//this function allows the comment section and handlebars to work
async function commentFormHandler(event) {
    event.preventDefault();
//only select textarea
    const comment_text = document.querySelector("textarea").value.trim();
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
              "Sorry to tell you but the comment you have wrote is too long"
            );
          }
        }
      }
      //calling function
      document
  .querySelector(".comment-section-form")
  .addEventListener("submit", commentFormHandler);