//signup js
async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector("#username").value.trim();
  const email = document.querySelector("#signup-email").value.trim();
  const password = document.querySelector("#signup-password").value.trim();
