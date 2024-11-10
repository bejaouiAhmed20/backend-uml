const { addReservation, getAllReservations, getReservationByOwnerID, refuseReservation } = require("../models/reservationModel");

const createReservation = (req, res) => {
  const idDestination = req.params.idDestination;
  const { idClient, numberOfPersons,reservationDate } = req.body;

  addReservation({ idClient, idDestination, numberOfPersons,reservationDate }, (err, result) => {
    if (err) {
      return res.status(500).json({ err: err });
    }
    res.status(200).send(result);
  });
};

const listReservations = (req, res) => {
  getAllReservations((err, result) => {
    if (err) {
      return res.json({ err: err });
    }
    res.json(result);
  });
};
const reservationById = (req, res) => {
  const ownerId = req.params.ownerId;
  getReservationByOwnerID(ownerId, (error, results) => {
    if (error) {
      res.status(500).send('Erreur lors de la récupération des réservations');
    } else {
      res.send(results); // Renvoie les résultats sous forme de JSON
    }
  });
}
const annulerRes = (req,res) => {
  refuseReservation(idClient, (error, results) => {
    if (error) {
      res.status(500).send('Erreur lors de la récupération des réservations');
    } else {
      res.json(results); // Renvoie les résultats sous forme de JSON
    }
  });
}



module.exports = { createReservation, listReservations, reservationById, annulerRes };
