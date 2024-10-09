const db = require("../config/db");

const addReservation = (data, callback) => {
  const { idClient, idDestination, numberOfPersons,reservationDate } = data;
  const sql =
    "INSERT INTO Reservation (idClient, idRestaurant, numberOfPersons, reservationDate) VALUES (?,?,?,?)";
  db.query(sql, [idClient, idDestination, numberOfPersons, reservationDate], callback);
};

const getAllReservations = (callback) => {
  const sql = "SELECT * FROM Reservation";
  db.query(sql, callback);
};

module.exports = { addReservation, getAllReservations };
