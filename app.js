const express = require("express");
const cors = require("cors");
const app = express();
const Airtable = require("airtable");

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST"], // Specify allowed methods
    credentials: true, // Allow cookies to be sent with requests
  })
);

app.use(express.json()); // To parse JSON requests
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

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
// Login endpoint
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body; // Assuming you are sending email and password

  try {
    // Fetch records from your Airtable table
    const records = await base("Users") // Replace 'Users' with your actual table name
      .select({
        filterByFormula: `{Email} = '${email}'`, // Adjust field name as necessary
      })
      .firstPage();

    // Check if any records match the email
    if (records.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    // Assuming the password is stored in a field named 'Password'
    const user = records[0];
    if (user.fields.Password === password) {
      // Successful login
      return res
        .status(200)
        .json({ message: "Login successful", user: user.fields });
    } else {
      // Invalid password
      return res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    console.error("Error fetching from Airtable:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
