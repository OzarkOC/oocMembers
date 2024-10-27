const loginButton = document.querySelector('[ooc="login"]');
const modalOverlay = document.getElementById("modalOverlay");

// Hide the modal overlay on page load
modalOverlay.style.display = "none";

// Function to open modal
async function openModal() {
  try {
    const response = await fetch(
      "https://oocmembers.up.railway.app/api/login-modal"
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const modalHtml = await response.text();

    modalOverlay.innerHTML = modalHtml; // This will insert the HTML directly into modalOverlay
    modalOverlay.style.display = "flex"; // Show the overlay
    document
      .getElementById("loginForm")
      .addEventListener("submit", handleLogin);
  } catch (error) {
    console.error("Error fetching modal:", error);
  }
}

// Function to close modal
function closeModal() {
  modalOverlay.style.display = "none"; // Hide the modal overlay
  modalOverlay.innerHTML = ""; // Clear the modal HTML
}

// Function to handle login submission
async function handleLogin(e) {
  e.preventDefault(); // Prevent default form submission

  const email = document.getElementById("username").value; // Use email for the correct field
  const password = document.getElementById("password").value;

  // Send login request
  try {
    const response = await fetch(
      "https://oocmembers.up.railway.app/api/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // Ensure field names match the server's expectations
      }
    );

      return;
    const data = await response.json();

    // Check if the response was successful
    if (response.ok) {
      alert("Login successful");
      closeModal(); // Close the modal on successful login
    } else {
      alert("Login failed: " + data.message);
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed: " + error.message); // Handle network errors
  }
}

// Event listener for login button
loginButton.addEventListener("click", openModal);

// Click outside modal to close
modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    closeModal(); // Close the modal if the overlay is clicked
  }
});

// Function to dynamically load a CSS file
function loadCSS(filename) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = filename;
  document.head.appendChild(link);
}

// Load the style.css from the public folder
loadCSS("/style.css");

// Close button event listener
document.addEventListener("click", (event) => {
  if (event.target.id === "closeModal") {
    closeModal(); // Close the modal when the close button is clicked
  }
});
