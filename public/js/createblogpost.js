//async function
async function createFormHandler(event) {
    event.preventDefault();
//const for title and actually content of the blog post
    const title = document.querySelector(".blog-title").value;
    const blog_content = document.querySelector(".blog-body").value;