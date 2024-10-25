const loginButton = document.querySelector('[ooc="login"]');
const modalOverlay = document.getElementById("modalOverlay");

// Function to open modal
async function openModal() {
  try {
    const response = await fetch(
      "https://yourapp.up.railway.app/api/login-modal"
    );
    const modalHtml = await response.text();

    modalOverlay.innerHTML = modalHtml; // Insert the HTML directly
    modalOverlay.style.display = "block"; // Show overlay

    // Add event listener for the close button and form submission
    const closeButton = document.getElementById("closeModal");
    const form = document.getElementById("loginForm");

    closeButton.addEventListener("click", closeModal);
    form.addEventListener("submit", handleLogin);
  } catch (error) {
    console.error("Error fetching modal:", error);
  }
}

// Function to close modal
function closeModal() {
  modalOverlay.style.display = "none";
  modalOverlay.innerHTML = ""; // Clear the modal
}

// Function to handle login submission
async function handleLogin(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Send login request
  try {
    const response = await fetch(
      "https://oocmembers.up.railway.app/api/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    const data = await response.json();
    if (data.success) {
      alert("Login successful");
      closeModal();
    } else {
      alert("Login failed: " + data.message);
    }
  } catch (error) {
    console.error("Login error:", error);
  }
}

// Event listener for login button
loginButton.addEventListener("click", openModal);

// Click outside modal to close
modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    closeModal();
  }
});
