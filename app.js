// app.js or index.js (Node.js)
const express = require("express");
const app = express();
app.use(express.json()); // to parse JSON requests

// Serve login modal HTML
app.get("/api/login-modal", (req, res) => {
  const loginModalHtml = `
    <div id="loginModal" style="display: block;">
      <h2>Login</h2>
      <form id="loginForm">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <br><br>
        <button type="submit">Submit</button>
        <button type="button" id="closeModal">Cancel</button>
      </form>
    </div>
  `;
  res.send(loginModalHtml);
});

// Handle login request
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Mock authentication (replace with your actual logic)
  if (username === "user" && password === "pass") {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
