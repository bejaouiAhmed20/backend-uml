const express = require("express");
const router = express.Router();
const { 
  createReservation, 
  rejectRezervation, 
  listReservations, 
  reservationById, 
  destinationByClientId, 
  acceptReservation 
} = require("../controllers/reservationController");

// List all reservations
router.get("/", listReservations);

// Create a new reservation
router.post("/add/:idDestination", createReservation);

// Get reservations by owner ID
router.get("/:ownerId", reservationById);

// Get reservations by client ID
router.get("/clientRes/:clientId", destinationByClientId);

// Accept reservation (by reservation ID)
router.put("/:id/accept", acceptReservation);

// Reject reservation (by reservation ID)
router.put("/:id/reject", rejectRezervation);

module.exports = router;
