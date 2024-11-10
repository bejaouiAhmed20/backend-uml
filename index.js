const express = require("express");
const cors = require("cors");
const app = express();

const destinationRoutes = require("./src/routes/destinationRoutes");
const reservationRoutes = require("./src/routes/reservationRoutes");
const ownerRoutes = require("./src/routes/ownerRoutes");
const menuRoutes = require("./src/routes/menuRoutes");
const clientRoutes = require('./src/routes/clientRoutes')
const offerRoute = require('./src/routes/offerRoute')
const ratingRoutes = require('./src/routes/ratingRoutes')
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/destinations", destinationRoutes);
app.use("/reservations", reservationRoutes);
app.use("/owner", ownerRoutes);
app.use("/menus", menuRoutes); 
app.use("/client", clientRoutes);
app.use("/offers", offerRoute);
app.use('/ratings',ratingRoutes);

// Server setup
app.listen(5000, () => {
  console.log("App running at port 5000");
});
