// Function to fetch the list of created links
function fetchLinks() {
  fetch("https://trim-q1wc.onrender.com/Api/getuserurls", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    },
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error: " + response.status);
      }
    })
    .then(function (data) {
      // Update the link list
      var linkList = document.getElementById("linkList");
      linkList.innerHTML = data;

      // data.forEach(function(link) {
      //   var li = document.createElement('li');
      //   li.textContent = link;
      //   linkList.appendChild(li);
      // });
    })
    .catch(function (error) {
      console.error(error);
    });
}

// Function to generate a short link
async function generateShortLink(longUrl) {
  try {
    const response = await fetch(
      "https://trim-q1wc.onrender.com/Api/shortenurl",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
        body: JSON.stringify({ originalURL: longUrl }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      var shortenedLink = document.getElementById("shortenedLink");
      var linkValue = document.getElementById("linkValue");
      linkValue.textContent = data.completeUrl;
      shortenedLink.style.display = "block";
    } else {
      throw new Error("Error: " + response.status);
    }
  } catch (error) {
    console.error(error);
  }
}
  
  // Function to generate a new URL with a custom tag
async function generateCustomURL(desiredTag) {
    try {
      // Get the value of the 'shortId' parameter from the URL
      const url = window.document.getElementById("linkValue").innerText
      const shortId = url.split("/")[1];
      console.log(shortId);
  
      const response = await fetch(
        `https://trim-q1wc.onrender.com/customurl/${shortId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
          body: JSON.stringify({ customUrl: desiredTag }),
       
        }
      );   console.log(body)
  
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        var newLink = document.getElementById("newLink");
        var newLinkValue = document.getElementById("newLinkValue");
        newLinkValue.textContent = data.customURL;
        newLink.style.display = "block";
      } else {
        throw new Error("Error: " + response.status);
      }
    } catch (error) {
      console.error(error);
    }
  }
  

// Function to generate a QR code
function generateQRCode(data) {
  fetch("https://trim-q1wc.onrender.com/Api/generateQRCode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    },
    body: JSON.stringify({ data: data }),
  })
    .then(function (response) {
      if (response.ok) {
        return response.blob();
      } else {
        throw new Error("Error: " + response.status);
      }
    })
    .then(function (data) {
      var qrCodeImage = document.getElementById("generated-qrcode");
      qrCodeImage.src = URL.createObjectURL(data);
      qrCodeImage.style.display = "block";
    })
    .catch(function (error) {
      console.error(error);
    });
}

// Event listener for the "Generate Short Link" form submission
document
  .getElementById("shortenLinkForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var longUrl = document.getElementById("longUrl").value;
    generateShortLink(longUrl);
  });

// Event listener for the "Generate New URL" form submission
document
  .getElementById("custoiseLinkForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var desiredTag = document.getElementById("desiredTag").value;
    generateCustomURL(desiredTag);
  });

// Event listener for the "Generate QR Code" form submission
document
  .getElementById("generateQRCodeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var qrCodeData = document.getElementById("qrCodeData").value;
    generateQRCode(qrCodeData);
  });

// Event listener for the "Get all URLs" button
document
  .getElementById("created-links")
  .querySelector("button")
  .addEventListener("click", function (event) {
    event.preventDefault();

    fetchLinks();
  });

// Fetch the list of created links when the dashboard page loads
fetchLinks();

// Function to log out the user
function logout() {
  localStorage.removeItem("jwtToken");
  window.location.href = "index.html";
}

// Event listener for the logout button
document
  .getElementById("logoutButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    logout();
  });
