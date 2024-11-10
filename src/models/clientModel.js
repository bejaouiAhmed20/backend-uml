const db = require("../config/db")
const findClientByEmail = (email, callback) => {
    const query = `SELECT * FROM client WHERE email = ?`;
    db.query(query, [email], callback);
  };
  
  const addClient = (firstName, lastName, email, phone, password, callback) => {
    const insertQuery = `INSERT INTO client (firstName, lastName, email, phone, password) VALUES (?, ?, ?, ?, ?)`;
    db.query(insertQuery, [firstName, lastName, email, phone, password], callback);
  };
  
  module.exports = { findClientByEmail, addClient };