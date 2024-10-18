const express = require("express");
const cors = require("cors");
const app = express();
const destinationRoutes = require("./src/routes/destinationRoutes");
const reservationRoutes = require("./src/routes/reservationRoutes");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/destinations", destinationRoutes);
app.use("/reservations", reservationRoutes);

app.listen(5000, () => {
  console.log("App running at port 5000");
});
