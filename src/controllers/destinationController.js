const {
  addDestination,
  deleteDestination,
  getAllDestinations,
  getDestinationById,
  putDestinationById,
  getAllDestinationsDemand,
  rejectDestinationById
} = require("../models/destinationModel");
const upload = require("../middleware/upload");
const sendMail = require("../middleware/email");

const createDestination = (req, res) => {
  const { name, tables, adresse, description, phone, type, id_owner} = req.body;
  const image = req.files["image"]
    ? `/images/${req.files["image"][0].filename}`
    : null;
  const menu = req.files["menu"]
    ? `/images/${req.files["menu"][0].filename}`
    : null;

  addDestination(
    { name, tables, image, adresse, description, menu, phone, type, id_owner },
    (err, result) => {
      if (err) {
        return res.json({ err: err });
      }
      res.json({ message: "Destination added successfully", result });
    }
  );
};

const removeDestination = (req, res) => {
  const id = req.params.id;
  deleteDestination(id, (err, result) => {
    if (err) {
      return res.json({ err: err });
    }
    res.json({ message: "Deleted successfully" });
  });
};

const listDestinations = (req, res) => {
  getAllDestinations((err, result) => {
    if (err) {
      return res.json({ err: err });
    }
    res.json(result);
  });
};
const listDestinationsDemand = (req, res) => {
  getAllDestinationsDemand((err, result) => {
    if (err) {
      return res.json({ err: err });
    }
    res.json(result);
  });
};

const getOneDestination = (req, res) => {
  const id = req.params.id;
  getDestinationById(id, (err, result) => {
    if (err) {
      return res.json({ err: err });
    }
    res.json(result);
  });
};
const acceptDestination = (req, res) => {
  const id = req.params.id;
  const {email} = req.body;

  putDestinationById(id, (err, result) => {
    if (err) {
      return res.json({ err: err });
    }
    sendMail(email,true)
      .then((response) =>
        res.send({ msg: response.message, message: "updated successfully",id:id })
      )
      .catch((error) => res.send(error.message));
  });
};
const rejectDestination = (req, res) => {
  const id = req.params.id;
  const {email} = req.body;

  rejectDestinationById(id, (err, result) => {
    if (err) {
      return res.json({ err: err });
    }
    sendMail(email,false)
    .then((response) =>
      res.send({ msg: response.message, message: "updated successfully",id:id })
    )
    .catch((error) => res.send(error.message));
    
  });
};

module.exports = {
  createDestination,
  removeDestination,
  listDestinations,
  getOneDestination,
  acceptDestination,
  listDestinationsDemand,
  rejectDestination
};
