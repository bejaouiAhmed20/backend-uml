const { 
  getDestinationByClientID, 
  addReservation, 
  getAllReservations, 
  getReservationByOwnerID, 
  rejectReservationById,
  putReservationById

   
} = require("../models/reservationModel");
const upload = require("../middleware/upload");
const sendMail = require("../middleware/email");

const createReservation = (req, res) => {
  const idDestination = req.params.idDestination;
  const { idClient, numberOfPersons, reservationDate } = req.body;

  addReservation({ idClient, idDestination, numberOfPersons, reservationDate }, (err, result) => {
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
      res.send(results);
    }
  });
};

const acceptReservation = (req, res) => {
  const id = req.params.id;
  const { email } = req.body;

  putReservationById(id, (err, result) => {
    if (err) {
      return res.json({ err: err });
    }
    sendMail(email, true)
      .then((response) =>
        res.send({
          msg: response.message,
          message: "Updated successfully",
          id: id,
        })
      )
      .catch((error) => res.send(error.message));
  });
};

const rejectRezervation = (req, res) => {
  const id = req.params.id;
  const { email } = req.body;

  rejectReservationById(id, (err, result) => {
    if (err) {
      return res.json({ err: err });
    }
    sendMail(email, false)
      .then((response) =>
        res.send({
          msg: response.message,
          message: "Deleted successfully",
          id: id,
        })
      )
      .catch((error) => res.send(error.message));
  });
};

const destinationByClientId = (req, res) => {
  const clientId = req.params.clientId; 
  getDestinationByClientID(clientId, (error, results) => {
    if (error) {
      res.status(500).send('Erreur lors de la récupération des destinations');
    } else {
      res.json(results);
    }
  });
};

module.exports = { 
  createReservation, 
  listReservations, 
  reservationById, 
  acceptReservation, 
  rejectRezervation, 
  destinationByClientId 
};
