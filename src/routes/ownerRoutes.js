const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../config/db");

router.post("/signup", (req, res) => {
  const { name, email, password, phone } = req.body;

  const query = `SELECT * FROM owner WHERE email = ?`;
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (result.length > 0) {
      console.log("Owner already exists");
      return res.status(400).json({ message: "Owner already exists" });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error hashing password" });
      }

      const insertQuery = `INSERT INTO owner (name, email, password, phone) VALUES (?, ?, ?, ?)`;
      db.query(
        insertQuery,
        [name, email, hashedPassword, phone],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error inserting owner" });
          }

          console.log("Owner registered successfully");
          return res.status(201).json({ message: "Owner registered successfully" });
        }
      );
    });
  });
});


router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM owner WHERE email = ?`;
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (result.length === 0) {
      console.log("Owner not found");
      return res.status(404).json({ message: "Owner not found" });
    }

    const owner = result[0];

    bcrypt.compare(password, owner.password, (err, isMatch) => {
      if (err) {
        console.error("Password comparison error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (!isMatch) {
        console.log("Invalid credentials");
        return res.status(401).json({ message: "Invalid credentials" });
      }

      console.log("Login successful");
      return res.status(200).json({ message: "Login successful", ownerId: owner.id }); 
    });
  });
});

module.exports = router;
