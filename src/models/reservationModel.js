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
const getReservationByOwnerID = (ownerId, callback) => {
  const sql = `
    SELECT * 
    FROM Reservation
    JOIN Destination ON Reservation.idRestaurant = Destination.id
    JOIN Owner ON Destination.id_owner = Owner.id
    WHERE Owner.id = ?;
  `;
  db.query(sql, [ownerId], callback);
};

const acceptReservation = (reservationId, callback) => {
  const sql = "UPDATE Reservation SET status = 'accepted' WHERE id = ?";
  db.query(sql, [reservationId], callback);
};
const refuseReservation = (reservationId, callback) => {
  const sql = "DELETE FROM Reservation WHERE id = ?";
  db.query(sql, [reservationId], callback);
};



module.exports = { addReservation, getAllReservations, getReservationByOwnerID, acceptReservation, refuseReservation };
