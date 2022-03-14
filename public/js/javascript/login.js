const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    
    if (email && password) {
        const reponse = await fetch('/api/user/login', {
            method: 'Post',
            body: JSON.stringify({email, password}),
            headers: { 'Content-Type': 'application/json' },
        });
        if (reponse.ok) {
            document.location.replace('/');
        } else {
            alert('Log-in failed. Try again.');
        }
        
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
        const reponse = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
          });
      
          if (response.ok) {
            document.location.replace('/');
          } else {
            alert('Log-in failed. Try again.');
          }
        }
      };

document
      .querySelector('.login-form')
      .addEventListener('submit', loginFormHandler);

      document
      .querySelector('.signup-form')
      .addEventListener('submit', signupFormHandler);