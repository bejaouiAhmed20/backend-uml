const bcrypt = require("bcrypt");
const { findOwnerByEmail, addOwner } = require("../models/ownerModel");

const signup = (req, res) => {
  const { name, email, password, phone } = req.body;

  findOwnerByEmail(email, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: "Owner already exists" });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error hashing password" });
      }

      addOwner(name, email, hashedPassword, phone, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error inserting owner" });
        }

        return res.status(201).json({ message: "Owner registered successfully" });
      });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  findOwnerByEmail(email, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Owner not found" });
    }

    const owner = result[0];

    bcrypt.compare(password, owner.password, (err, isMatch) => {
      if (err) {
        console.error("Password comparison error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      return res.status(200).json({ message: "Login successful", ownerId: owner.id });
    });
  });
};

module.exports = { signup, login };
