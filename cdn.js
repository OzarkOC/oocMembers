const loginButton = document.querySelector('[ooc="login"]');
      const modalOverlay = document.getElementById("modalOverlay");

      // Function to open modal
      function openModal() {
        // Create modal elements
        const modal = document.createElement("div");
        modal.className = "modal";

        const title = document.createElement("h2");
        title.textContent = "Login";

        const form = document.createElement("form");
        form.id = "loginForm";

        const usernameLabel = document.createElement("label");
        usernameLabel.htmlFor = "username";
        usernameLabel.textContent = "Username:";
        const usernameInput = document.createElement("input");
        usernameInput.type = "text";
        usernameInput.id = "username";
        usernameInput.name = "username";
        usernameInput.required = true;

        const passwordLabel = document.createElement("label");
        passwordLabel.htmlFor = "password";
        passwordLabel.textContent = "Password:";
        const passwordInput = document.createElement("input");
        passwordInput.type = "password";
        passwordInput.id = "password";
        passwordInput.name = "password";
        passwordInput.required = true;

        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.textContent = "Submit";

        const closeButton = document.createElement("button");
        closeButton.type = "button";
        closeButton.textContent = "Cancel";
        closeButton.id = "closeModal";

        // Append elements to the form
        form.appendChild(usernameLabel);
        form.appendChild(usernameInput);
        form.appendChild(document.createElement("br"));
        form.appendChild(passwordLabel);
        form.appendChild(passwordInput);
        form.appendChild(document.createElement("br"));
        form.appendChild(submitButton);
        form.appendChild(closeButton);

        // Append title and form to modal
        modal.appendChild(title);
        modal.appendChild(form);
        modalOverlay.appendChild(modal); // Append modal to overlay
        modalOverlay.style.display = "block"; // Show overlay

        // Add event listeners for the modal
        closeButton.addEventListener("click", closeModal);
        form.addEventListener("submit", handleLogin);
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
            "https://yourapp.up.railway.app/api/login",
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