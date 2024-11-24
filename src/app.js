// Import required modules
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const weatherData = require("../utils/weatherData");
const slidingWindowLimiter = require("../middleware/slidingWindow");
const globalLimiter = require("../middleware/globalLimiter");
const logBlockedAttempt = require("../middleware/logmsg");
const setUserRole = require("../middleware/setUserRole");
const { log } = require("console");
const app = express();
const port = 5000;
app.use(express.urlencoded({ extended: true }));
// Paths for Express configuration
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set views folder
app.set("views", path.join(__dirname, "../views"));


// Set view engine to EJS
app.set("view engine", "ejs");

hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

// Middleware to parse JSON requests
app.use(express.json());

// Basic route
app.get("/", globalLimiter,(req, res) => {
    // res.render("index", { title: "Weather App" });
    res.render("login",);
});

// // Serve a basic form for registration
// app.get("/register",globalLimiter,slidingWindowLimiter,(req, res) => {
//     res.render("login");
// });

const allowedUsers = [
    {
        role: "guest",
        password: "guest",
    },
    {
        role: "admin",
        password: "admin",
    }
];

let registeredUsers = [];

app.use(express.urlencoded({ extended: true })); // To parse form data (if you're using a form)

app.post("/register", setUserRole,slidingWindowLimiter, (req, res) => {
    const { role, password } = req.body;

    // Validate user credentials dynamically based on role and password
    const allowedUser = allowedUsers.find(user => user.role === role && user.password === password);

    if (allowedUser) {
        // Check if the username is already registered
        // const userExists = registeredUsers.some((user) => user.username === username);

        // if (userExists) {
        //     return res.render("login", {
        //         title: "Register",
        //         error: "This username is already taken.",
        //         role,
        //         username,
        //     });
        // }

        // // Add user to the registeredUsers array
        // registeredUsers.push({ username, role });

        // Redirect to index page after successful registration
        return res.render("index");
    } else {
        // // Render the registration page again with an error message
        // return res.render("login", {
        //     title: "Register",
        //     error: "Invalid credentials. Registration not allowed.",
        //     role,
        //     username,
        // });
        console.log("enter valid login");
    }
});

// Weather route
app.get("/weather",slidingWindowLimiter,(req, res) => {
    if (!req.query.address) {
      return res.send("Address is required");
    }
    weatherData(req.query.address, (error, result) => {
      if (error) {
        return res.send(error);
      }
  
      res.send(result);
    });
  });





  app.get("*", (req, res) => {
    res.render("404", { title: "Page not found" });
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
