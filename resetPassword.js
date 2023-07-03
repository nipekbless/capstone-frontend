document.getElementById('resetPasswordForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    try {
      const email = document.getElementById('email').value;
      const newPassword = document.getElementById('newPassword').value;
  
      const response = await fetch('https://trim-q1wc.onrender.com/Api/resetpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, newPassword })
      });
  
      if (response.ok) {
        const data = await response.json();
        const success = data.message
        document.getElementById('message').innerHTML = success;
        window.location.href = 'signin.html';
      } else {
        const data = await response.json();
        const userNotFound = data.message;
        console.log(data.message);
        document.getElementById('message').innerHTML = userNotFound;
        throw new Error('Error: ' + response.status);
      }
    } catch (error) {
      console.error(error);
    }
  });