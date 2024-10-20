const db = require("../config/db");
const bcrypt = require("bcrypt");

const findOwnerByEmail = (email, callback) => {
  const query = `SELECT * FROM owner WHERE email = ?`;
  db.query(query, [email], callback);
};

const addOwner = (name, email, password, phone, callback) => {
  const insertQuery = `INSERT INTO owner (name, email, password, phone) VALUES (?, ?, ?, ?)`;
  db.query(insertQuery, [name, email, password, phone], callback);
};

module.exports = { findOwnerByEmail, addOwner };
