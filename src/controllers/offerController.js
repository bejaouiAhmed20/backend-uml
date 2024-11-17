const {
  addOffer,
  getAllOffers,
  deleteOfferById,
  updateOfferById,
} = require("../models/offerModel");

const ajouterOffer = (req, res) => {
  const { name, date_debut, date_fin, description } = req.body;
  addOffer(name, date_debut, date_fin, description, (err, result) => {
    if (err) {
      return res.status(500).json({ err: err.message });
    }

    return res
      .status(201)
      .json({ message: "Offre ajoutée avec succès", result: result });
  });
};

const getOffers = (req, res) => {
  getAllOffers((err, offers) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json({ offers });
  });
};

const deleteOffer = (req, res) => {
  const { id } = req.params;

  deleteOfferById(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Offer not found" });
    }
    return res.status(200).json({ message: "Offer deleted successfully" });
  });
};

const updateOffer = (req, res) => {
  const { id } = req.params;
  const { name, date_debut, date_fin, description } = req.body;

  updateOfferById(
    id,
    name,
    date_debut,
    date_fin,
    description,
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Offer not found" });
      }
      return res.status(200).json({ message: "Offer updated successfully" });
    }
  );
};
module.exports = { ajouterOffer, getOffers, deleteOffer, updateOffer };
