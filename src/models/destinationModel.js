const db = require("../config/db");

const addDestination = (data, callback) => {
  const { name, tables, image, adresse, description, menu, phone, type, id_owner } = data;
  const sql =
    "INSERT INTO Destination (name, tables, image, adresse, description, menu, phone, type, id_owner) VALUES (?,?,?,?,?,?,?,?,?)";
  db.query(sql, [name, tables, image, adresse, description, menu, phone, type, id_owner], callback);
};


const deleteDestination = (id, callback) => {
  const sql = "DELETE FROM Destination WHERE id = ?";
  db.query(sql, id, callback);
};

const putDestination = (id, data, callback) => {
  const { name, tables, adresse, description, phone, type,  } = data;
  const sql = `
    UPDATE Destination 
    SET name = ?, tables = ?, adresse = ?, description = ?, phone = ?, type = ? WHERE id = ?`;
  db.query(sql, [name, tables, adresse, description, phone, type,id ], callback);
};

const getAllDestinations = (callback) => {
  const sql = "SELECT * FROM Destination";
  db.query(sql, callback);
};
const getAllDestinationsDemand = (callback) => {
  const sql = "SELECT Destination.id,Destination.name,image,menu,tables,adresse,description,Destination.phone,type,state,id_owner,email,password FROM `destination`,`owner` WHERE owner.id = id_owner and  state = 'false'";
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
module.exports = { addDestination, deleteDestination, getAllDestinations, getDestinationById,putDestinationById,getAllDestinationsDemand,rejectDestinationById,putDestination };
