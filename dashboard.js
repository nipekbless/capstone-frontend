// Function to fetch the list of created links
async function fetchLinks() {
  try {
    const response = await fetch("https://trim-q1wc.onrender.com/Api/getuserurls", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });

    if (!response.ok) {
      throw new Error("Error: " + response.status);
    }

    const data = await response.json();

    // Update the link list
    var linkList = document.getElementById("linkList");
    linkList.innerHTML = ""; // Clear existing list
  console.log(data)
    var urlData = data.urlInfo
    for (const info of urlData) {
      var originalURL = info.originalURL;
      var shortUrl = info.shortUrl;
      var createdAt = info.createdAt;
      var clicks = info.clicks;
      var referringSources = info.referringSources;
      var lastClickedAt = info.lastClickedAt;

      // Create a container element for link details
      var linkDetails = document.createElement("div");

      // Create paragraph elements for each property
      var originalUrlParagraph = document.createElement("p");
      originalUrlParagraph.textContent = "Original URL: " + originalURL;

      var shortUrlParagraph = document.createElement("p");
      shortUrlParagraph.textContent = "Short URL: " + shortUrl;

      var createdAtParagraph = document.createElement("p");
      createdAtParagraph.textContent = "Created At: " + createdAt;

      var clicksParagraph = document.createElement("p");
      clicksParagraph.textContent = "Clicks: " + clicks;

     // Create referring sources paragraph only if the array is not empty
        if (referringSources.length > 0) {
      var referringSourcesParagraph = document.createElement("p");
      referringSourcesParagraph.textContent =
        "Referring Sources: " + referringSources.join(", ");
        linkDetails.appendChild(referringSourcesParagraph);
        }

      var lastClickedAtParagraph = document.createElement("p");
      if (lastClickedAt !== undefined) {
      lastClickedAtParagraph.textContent = "Last Clicked At: " + lastClickedAt;}

      // Append the paragraph elements to the link details container
      linkDetails.appendChild(originalUrlParagraph);
      linkDetails.appendChild(shortUrlParagraph);
      linkDetails.appendChild(createdAtParagraph);
      linkDetails.appendChild(clicksParagraph);
     
      linkDetails.appendChild(lastClickedAtParagraph);

      // Create a list item element
      var listItem = document.createElement("li");

      // Append the link details container to the list item
      listItem.appendChild(linkDetails);

      // Append the list item to the link list
      linkList.appendChild(listItem);
    }
  } catch (error) {
    console.error(error);
  }
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
      const url = document.getElementById("shortLink").value
      console.log(url)
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
      ); 
  
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        const customisedUrl = data.replace("https://", "");;
        var newLink = document.getElementById("newLink");
        var newLinkValue = document.getElementById("newLinkValue");
        newLinkValue.textContent = customisedUrl;
        newLink.style.display = "block";
      } else {
        throw new Error("Error: " + response.status);
      }
    } catch (error) {
      console.error(error);
    }
  }
  

// Function to generate a QR code
function generateQRCode(QrCodeData) {
  fetch("https://trim-q1wc.onrender.com/Api/qrcode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    },
    body: JSON.stringify({ 
      shortUrl: "https://" + QrCodeData }),
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error: " + response.status);
      }
    })
    .then(function (data) {
      console.log(data)
        // Retrieve the QR code link from the response
      const qrCodeLink = data.qrCodeUrl
      var qrCodeImage = document.getElementById("generated-qrcode");
      qrCodeImage.src = qrCodeLink;
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

// // Fetch the list of created links when the dashboard page loads
// fetchLinks();

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
