const { addDestination, deleteDestination, getAllDestinations, getDestinationById } = require("../models/destinationModel");
const upload = require("../middleware/upload");

const createDestination = (req, res) => {
  const { name, tables, adresse, description, phone, type } = req.body;
  const image = req.files["image"] ? `/images/${req.files["image"][0].filename}` : null;
  const menu = req.files["menu"] ? `/images/${req.files["menu"][0].filename}` : null;

  addDestination({ name, tables, image, adresse, description, menu, phone, type }, (err, result) => {
    if (err) {
      return res.json({ err: err });
    }
    res.json({ message: "Destination added successfully", result });
  });
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

const getOneDestination = (req, res) => {
  const id = req.params.id;
  getDestinationById(id, (err, result) => {
    if (err) {
      return res.json({ err: err });
    }
    res.json(result);
  });
};

module.exports = { createDestination, removeDestination, listDestinations, getOneDestination };
