const express = require("express");
const session = require("express-session");
const profileRoute = require("./routes/profile");
const apiRoute = require("./routes/api");
const app = express();
const port = 5000;

// Mysql connection
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pranav",
  database: "express_test",
});

// App Middleware
app.use(express.json());
app.use(session({ secret: "keyboard cat", cookie: { maxAge: 60000 } }));

// custom middlewares
app.use((req, res, next) => {
  //   console.log("Middleware 1 executed");
  console.log(`first middleware ${req.method} ${req.url}`);
  next();
});
app.use((req, res, next) => {
  console.log(`second middleware ${req.method} ${req.url}`);
  next();
});

// Profile Route
app.use("/profile", profileRoute);

// API Route
app.use("/api", apiRoute);

// Test route
app.get("/", function (req, res) {
  // res.json({"msg":"Hello Pranav Titambe"})
  res.status(200).send("Hello Pranav Titambe");
});

app.get("/login", (req, res) => {
  req.session.user = { username: "Pranav Titambe" };
  res.send("User logged in");
  req.session.save();
  console.log("Pranav's session", req.session);
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("User logged out");
});

app.get("/my", (req, res) => {
  if (req.session.user) {
    res.send(`Welcome ${req.session.user.username}`);
  } else {
    res.send("Unauthorized");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL: " + err.stack);
      return;
    }
    console.log("Connected to MySQL as ID " + connection.threadId);
    // connection.query("INSERT INTO users (name, email) VALUES ('Pranav', 'pranav@gmail.com')", (err, result) => {
    //   if (err) {
    //     console.error('Error connecting to MySQL: ' + err.stack);
    //     return;
    //   }
    //   console.log(result);
    // });
    // connection.query(
    //   "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255))",
    //   (err, result) => {
    //     if (err) {
    //       console.error("Error connecting to MySQL: " + err.stack);
    //       return;
    //     }
    //     console.log(result);
    //   }
    // );
    // connection.query(
    //   "INSERT INTO users (name, email) VALUES ('Pranav', 'pranav@gmail.com')",
    //   (err, result) => {
    //     if (err) {
    //       console.error("Error connecting to MySQL: " + err.stack);
    //       return;
    //     }
    //     console.log(result);
    //   }
    // );
    connection.query("SELECT * FROM users", (err, result) => {
      if (err) {
        console.error("Error connecting to MySQL: " + err.stack);
        return;
      }
      console.log(result);
    });
  });

  //   connection.end();
});
