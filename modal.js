$(document).ready(function () {
  // Function to open modal
  function openModal() {
    $.get(
      "https://oocmembers.up.railway.app/api/login-modal",
      function (modalHtml) {
        $("#modalOverlay").html(modalHtml).css("display", "flex"); // Show overlay and insert HTML
      }
    ).fail(function () {
      console.error("Error fetching modal");
    });
  }

  // Function to close modal
  function closeModal() {
    $("#modalOverlay").hide(); // Hide the modal overlay
    $("#modalOverlay").html(""); // Clear the modal HTML
  }

  // Handle click on all elements with ooc="login"
  $('[ooc="login"]').on("click", function () {
    openModal();
  });

  // Click outside modal to close
  $(document).on("click", "#modalOverlay", function (event) {
    if (event.target === this) {
      closeModal();
    }
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
        alert("Login successful");
        closeModal(); // Close modal on success
      }
    ).fail(function (xhr) {
      alert("Login failed: " + xhr.responseJSON.message);
    });
  });
});
