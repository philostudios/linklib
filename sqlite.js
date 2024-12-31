// Module handles database management, Server API calls the methods in here to query and update the SQLite database

// Utilities
const fs = require("fs");

// Initialize the database
const sqlite3 = require("sqlite3").verbose();
const dbWrapper = require("sqlite");
const dbFile = "database.db"; 
const exists = fs.existsSync(dbFile);
let db;

// Open the database connection using async/await
const initializeDatabase = async () => {
    db = await dbWrapper.open({
        filename: dbFile,
        driver: sqlite3.Database
    });
        // Create Users and Links tables if they don't exist
        await db.run(
            "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT)"
        );
        await db.run(
            "CREATE TABLE IF NOT EXISTS links (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, url TEXT, tag TEXT, userId INTEGER, FOREIGN KEY (userId) REFERENCES users(id))"
        );
};

// Initialize the database
initializeDatabase().catch((error) => {
    console.error("Database connection error:", error);
});

// Server script will call these methods to connect to the db
module.exports = {
  
  
// Register a new user
// Receives username and password, hashes the password, and stores it in the database
  
  registerUser: async (username, password) => {
    try {
      //Check if username already exists
      const existingUser = await db.get("SELECT * FROM users WHERE username = ?", [username]);
        if (existingUser) {
            return { message: "Username already exists" };
        }

      // Proceed with inserting the new user into the Users table
      const result = await db.run("INSERT INTO users (username, password) VALUES (?, ?)", [
        username, password]);
        return { message: "User registered successfully", userId: result.lastID };
    } catch (dbError) {
        console.error(dbError);
        throw new Error("Database error");
    }
  },

  // Login a user
  // Receives username and password, checks the database for the user, and verifies the password
  
  loginUser: async (username, password) => {
    try {
      // Get the user from the database
      const user = await db.get("SELECT * FROM users WHERE username = ?", [username]);
      if (!user) {
        return { message: "User not found" };
      }
      if (user.password !== password) {
        return { message: "Invalid password" };
      }

      return { message: "Login successful", user: { id: user.id, username: user.username } };
    } catch (dbError) {
      console.error(dbError);
      throw new Error("Database error");
    }
  },
  
  // Save a link
    saveLink: async (title, url, tag, userId) => {
        try {
            await db.run("INSERT INTO links (title, url, tag, userId) VALUES (?, ?, ?, ?)", [title, url, tag, userId]);
            return { message: "Link saved successfully" };
        } catch (dbError) {
            console.error(dbError);
            throw new Error("Database error");
        }
    },

    // Get all links
    getAllLinks: async (userId) => {
        try {
            return await db.all("SELECT * FROM links WHERE userId = ? ORDER BY id DESC", [userId]);
        } catch (dbError) {
            console.error(dbError);
            throw new Error("Database error");
        }
    },

};