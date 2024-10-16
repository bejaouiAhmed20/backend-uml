const { addReservation, getAllReservations } = require("../models/reservationModel");

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

module.exports = { createReservation, listReservations };
