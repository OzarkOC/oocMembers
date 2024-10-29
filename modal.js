$(document).ready(function () {
  // Function to create and show the modal overlay
  function openModal() {
    // Create the modal overlay element
    const modalOverlay = $("<div>", {
      id: "modalOverlay",
      css: {
        display: "flex",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.7)",
        justifyContent: "center",
        alignItems: "center",
      },
    });

    // Fetch the modal HTML from the server
    $.get(
      "https://oocmembers.up.railway.app/api/login-modal",
      function (modalHtml) {
        // Append the fetched modal HTML to the overlay
        modalOverlay.append(modalHtml);
        // Append the overlay to the body
        $("body").append(modalOverlay);

        // Click event to close the modal when clicking outside of it
        modalOverlay.on("click", function (event) {
          if (event.target === modalOverlay[0]) {
            closeModal(modalOverlay);
          }
        });
      }
    ).fail(function () {
      console.error("Error fetching modal");
    });
  }

  // Function to close modal
  function closeModal(modalOverlay) {
    modalOverlay.remove(); // Remove the modal overlay from the DOM
  }

  // Handle click on all elements with ooc="login"
  $('[ooc="login"]').on("click", function () {
    openModal();
  });

  // Handle login form submission
  $(document).on("submit", "#loginForm", function (event) {
    event.preventDefault();

    const email = $("#username").val(); // Use jQuery to get the value
    const password = $("#password").val();

    // Send login request
    $.post(
      "https://oocmembers.up.railway.app/api/login",
      {
        email: email,
        password: password,
      },
      function (data) {
        localStorage.setItem("userRecordId", data.user.id); // Save the record ID in local storage
        closeModal($("#modalOverlay")); // Close modal on success
      }
    ).fail(function (xhr) {
      alert("Login failed: " + xhr.responseJSON.message);
    });
  });
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

document.querySelectorAll('[ooc="logout"]').forEach((button) => {
  button.addEventListener("click", () => {
    localStorage.removeItem("userRecordId"); // Clear the record ID from local storage
    alert("You have been logged out.");
    // Optional: Redirect to login page or refresh to reflect logout state
    window.location.reload();
  });
});
