// controllers/clientController.js
const bcrypt = require("bcrypt");
const { findClientByEmail, addClient } = require("../models/clientModel");

const signup = (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  findClientByEmail(email, (err, result) => {
    if (err) return res.status(500).json({ message: "Internal Server Error" });
    if (result.length > 0) return res.status(400).json({ message: "Client already exists" });

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: "Error hashing password" });

      addClient(firstName, lastName, email, phone, hashedPassword, (err) => {
        if (err) return res.status(500).json({ message: "Error inserting client" });
        return res.status(201).json({ message: "Client registered successfully" });
      });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  findClientByEmail(email, (err, result) => {
    if (err) return res.status(500).json({ message: "Internal Server Error" });
    if (result.length === 0) return res.status(404).json({ message: "Client not found" });

    const client = result[0];
    bcrypt.compare(password, client.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: "Internal Server Error" });
      if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

      return res.status(200).json({ message: "Login successful", clientId: client.idClient });
    });
  });
};

module.exports = { signup, login };
