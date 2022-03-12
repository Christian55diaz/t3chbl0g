//async function
async function createFormHandler(event) {
    event.preventDefault();
//const for title and actually content of the blog post
    const title = document.querySelector(".blog-title").value;
    const blog_content = document.querySelector(".blog-body").value;

    //we are trying to get response from our blogpost api
    //post method for title and blog content
    const response = await fetch(`/api/bpost`, {
        method: "POST",
        body: JSON.stringify({
          title,
          blog_content,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      //if statment for the user dashboard
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert(response.statusText);
      }
    }

    //call function for create blog post
    document
  .querySelector(".blog-post-create")
  .addEventListener("submit", createFormHandler);