const db = require("../config/db");

const addDestination = (data, callback) => {
  const { name, tables, image, adresse, description, menu, phone, type } = data;
  const sql =
    "INSERT INTO Destination (name, tables, image, adresse, description, menu, phone, type) VALUES (?,?,?,?,?,?,?,?)";
  db.query(sql, [name, tables, image, adresse, description, menu, phone, type], callback);
};

const deleteDestination = (id, callback) => {
  const sql = "DELETE FROM Destination WHERE id = ?";
  db.query(sql, id, callback);
};

const getAllDestinations = (callback) => {
  const sql = "SELECT * FROM Destination";
  db.query(sql, callback);
};
const getAllDestinationsDemand = (callback) => {
  const sql = "SELECT * FROM Destination where state != 'true'";
  db.query(sql, callback);
};

const getDestinationById = (id, callback) => {
  const sql = "SELECT * FROM Destination WHERE id = ?";
  db.query(sql, id, callback);
};
const putDestinationById = (id,callback)=>{
  const sql = "update destination set state = 'true' where id = ?"
  db.query(sql, id, callback);
}
const rejectDestinationById = (id,callback)=>{
  const sql = "update destination set state = 'rejected' where id = ?"
  db.query(sql, id, callback);
}
module.exports = { addDestination, deleteDestination, getAllDestinations, getDestinationById,putDestinationById,getAllDestinationsDemand,rejectDestinationById };
