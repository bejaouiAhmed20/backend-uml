const db = require("../config/db");
const addOffer = (name, date_debut, date_fin, description, callback) => {
  const sql =
    "INSERT INTO offer (name, date_debut, date_fin, description) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, date_debut, date_fin, description], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

const getAllOffers = (callback) => {
  const sql = "SELECT * FROM offer";

  db.query(sql, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

const deleteOfferById = (id, callback) => {
  const sql = "DELETE FROM offer WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
const updateOfferById = (
  id,
  name,
  date_debut,
  date_fin,
  description,
  callback
) => {
  const sql = `UPDATE offer 
               SET name = ?, date_debut = ?, date_fin = ?, description = ? 
               WHERE id = ?`;

  db.query(
    sql,
    [name, date_debut, date_fin, description, id],
    (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};
module.exports = { addOffer, getAllOffers, deleteOfferById, updateOfferById };
