const express = require("express");
const cors = require("cors");
const Airtable = require("airtable");
const path = require("path"); // Import path module

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Serve login modal HTML
app.get("/api/login-modal", (req, res) => {
  const loginModalHtml = `
    <div id="loginModal" style="
    display: flex;
    flex-direction: column;
    align-items: center;">
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
// Use process.env to access environment variables
const apiKey = process.env.AIRTABLE_API_KEY; // Use the key you set in Railway
const baseId = process.env.AIRTABLE_BASE_ID; // Use the key you set in Railway
const base = new Airtable({ apiKey: apiKey }).base(baseId);

// Login endpoint
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body; // Assuming you are sending email and password

  try {
    const records = await base("Users") // Replace 'Users' with your actual table name
      .select({
        filterByFormula: `{Email} = '${email}'`, // Adjust field name as necessary
      })
      .firstPage();

    if (records.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = records[0];
    if (user.fields.Password === password) {
      return res
        .status(200)
        .json({ message: "Login successful", user: user.fields });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    console.error("Error fetching from Airtable:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
