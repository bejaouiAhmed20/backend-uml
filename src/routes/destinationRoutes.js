const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { createDestination, removeDestination, listDestinations, getOneDestination } = require("../controllers/destinationController");

router.post("/add", upload.fields([{ name: "image" }, { name: "menu" }]), createDestination);
router.delete("/delete/:id", removeDestination);
router.get("/", listDestinations);
router.get("/:id", getOneDestination);

module.exports = router;
