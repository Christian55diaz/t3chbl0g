//this is for deleting a comment
    async function deleteCommentFormHandler(event) {
    event.preventDefault();
//this is to delete the whole blog post i think
//bc I am not sure how to delete the individual blogpost by id
const blogpost_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
//console log by blogpost id
console.log(blogpost_id);
  const response = await fetch(`/api/comments/${blogpost_id}`, {
    method: "DELETE",
    body: JSON.stringify({
      blogpost_id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  //response + alert
  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".delete-comment")
  .addEventListener("click", deleteCommentFormHandler);