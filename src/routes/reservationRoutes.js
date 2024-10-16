const express = require("express");
const router = express.Router();
const { createReservation, listReservations } = require("../controllers/reservationController");

router.post("/add/:idDestination", createReservation);
router.get("/", listReservations);

module.exports = router;
