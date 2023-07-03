document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  try {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('https://trim-q1wc.onrender.com/Api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('jwtToken', data.token);
      window.location.href = 'dashboard.html';
    } else {
      const data = await response.json();
      const userNotFound = data.message;
      console.log(data.message);
      document.getElementById('userNotFound').textContent = userNotFound;
      throw new Error('Error: ' + response.status);
    }
  } catch (error) {
    console.error(error);
  }
});

function redirectToSignup() {
  window.location.href = 'signup.html';
}

document.getElementById('signupButton').addEventListener('click', redirectToSignup);

function redirectToResetPassword() {
  window.location.href = 'resetPasword.html';
}

document.getElementById('resetPassword').addEventListener('click', redirectToResetPassword);
