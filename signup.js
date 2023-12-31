document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the form values
    var firstname = document.getElementById('firstname').value;
    var lastname = document.getElementById('lastname').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Create an object with the form data
    var formData = {
        first_name: firstname,
        last_name: lastname,
        email: email,
        password: password
    };

    // Perform a fetch request to your backend API
    fetch('https://trim-q1wc.onrender.com/Api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(function(response) {
        if (response.ok) {
            // Successful response from the API
            return response.json();
        } else {
            // Error response from the API
            throw new Error('Signup failed');
        }
    })
    .then(function(data) {
        // Process the response data
        console.log(data); // Do something with the response

        // Reset the form fields
        document.getElementById('firstname').value = '';
        document.getElementById('lastname').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';

        // Redirect to the signin.html page
        window.location.href = 'signin.html';
    })
    .catch(function(error) {
        // Error occurred during the request
        console.error('Signup failed:', error);
        document.getElementById('success').textContent = 'Signup failed. Please try again.';
    });
});
