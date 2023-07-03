document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
  
    // Send a request to the backend API for user authentication
    fetch('https://trim-q1wc.onrender.com/Api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    })
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error: ' + response.status);
        }
      })
      .then(function(data) {
        // Store the JWT token in the browser's local storage
        localStorage.setItem('jwtToken', data.token);
  
        // Redirect the user to the dashboard page
        window.location.href = 'dashboard.html';
      })
      .catch(function(error) {
        // Handle errors
        console.error(error);
      });
  });

// redirect new user to sigup page 
  
  function redirectToSignup() {
    window.location.href = 'signup.html';
}

document.getElementById('signupButton').addEventListener('click', redirectToSignup);
