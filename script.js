document.getElementById('shortenButton').addEventListener('click', async () => {
    const longUrl = document.getElementById('longUrlInput').value;

    try {
        const response = await fetch('https://trim-q1wc.onrender.com/Api/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ originalURL: longUrl })
        });

       if(response.ok){
        const data = await response.json();
        const shortenedUrl = data.completeUrl;
        console.log(data)

        document.getElementById('urlValue').textContent = shortenedUrl;
       }

       

    } catch (error) {
        console.error('Error:', error);const invalidUrl = "Invalid! Please check the URL"
       document.getElementById('urlValue').textContent = invalidUrl
    }
});
