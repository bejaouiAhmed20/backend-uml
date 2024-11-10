const express = require("express");
const router = express.Router();
const { createReservation, annulerRes, listReservations, reservationById} = require("../controllers/reservationController");
router.get("/",listReservations);
router.post("/add/:idDestination", createReservation);
router.get("/:ownerId", reservationById);
router.delete("/mesReservations/:clientId", annulerRes)
module.exports = router;
