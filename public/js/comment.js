//this function allows the comment section and handlebars to work
async function commentFormHandler(event) {
    event.preventDefault();
    // with the blog post i didn't want to be searching and searching for a blog post
    //so for this function is that an id will be taken and the link adress would showup as whatever blogpost you are on.
    const blogpost_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
      ];