//edit form handle
async function editFormHandler (event) {
    event.preventDefault();
// const or require id and title b/c we update the post by id by specific title & id
    const title = document.querySelector('input[name="post-title]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const contents = document.querySelector('textarea[name="post-contents"]').value.trim();
//method to allow for put/update/edit to go through properly
    if (title !== "" && contents !== "") {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title,
                contents
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            });
            if (response.ok) {
                document.location.replace('/dashboard/');
            } else {
                alert(response.statusText);
            }
            //if statements so that the edit proccess goes smoothly
    } else {
        if (title === "" && contents === "") {
            alert("Title and description required")
          } else if (title === "") {
            alert("Enter a title then you can repost")
          } else if (contents === "") {
            alert("Enter a description then post")
          } else {
          }
    }
}

document.querySelector('.edit-form').addEventListener('submit', editFormHandler);