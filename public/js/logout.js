const logout = async () => {
    const repsonse = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (repsonse.ok) {
        document.location.replace('/')
    } else {
        alert('Log-in failed. Try again.');
    }
};

document.querySelector('#logout').addEventListener('click', logtout);