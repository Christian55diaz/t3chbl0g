//adding delete async function
async function deleteFormHandler(event) {
    event.preventDefault();
    //here im trying to get the id only
    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
      ];
      //logging the id and targeting the blogpost api delete method to delete specific blogpost
      console.log(id);
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
      });

  //if repsonse making sure the delete goes well if not you get an alert
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".remove-blog")
  .addEventListener("click", deleteFormHandler);