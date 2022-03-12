//
async function editFormHandler (event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const contents = document.querySelector('textarea[name="post-contents"]').value.trim();

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