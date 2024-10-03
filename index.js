const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
const db = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "",
  database: "Restaurants",
});

db.connect((err) => {
  if (err) {
    console.log("error: " + err);
  }
  console.log("MySql has connected successfully :) ");
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });
//Add a Destination
app.post(
  "/addDestination",
  upload.fields([{ name: "image" }, { name: "menu" }]),
  (req, res) => {
    const { name, tables, adresse, description } = req.body;
    const image = req.files["image"]
      ? `/images/${req.files["image"][0].filename}`
      : null;
    const menu = req.files["menu"]
      ? `/images/${req.files["menu"][0].filename}`
      : null;
    const sql =
      "INSERT INTO Destination (name, tables, image, adresse, description,menu) VALUES (?,?,?,?,?,?)";
    db.query(
      sql,
      [name, tables, image, adresse, description, menu],
      (err, result) => {
        if (err) {
          return res.json({ err: err });
        }
        res.json({ message: "Destination added successfully", result });
      }
    );
  }
);
//Delete a destination
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "Delete from Destination where id = ?";
  db.query(sql, id, (err, result) => {
    if (err) {
      res.json({ err: err });
    }
    res.status(200).json({ message: "Deleted successfully" });
  });
});
//get all destinations
app.get("/destinations", (req, res) => {
  const sql = "Select * from Destination";
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ err: err });
    }
    res.json(result);
  });
});
//add a reservation
app.post("/addReservation/:idDestination", (req, res) => {
  const idDestination = req.params.idDestination;
  const date = new Date().toLocaleString();
  const { idClient, numberOfPersons } = req.body;
  const sql =
    "Insert into Reservation (idClient, idRestaurant, numberOfPersons, reservationDate)  values (?,?,?,?)";
  db.query(
    sql,
    [idClient, idDestination, numberOfPersons, date],
    (err, result) => {
      if (err) {
        res.status(500).json({ err: err });
      }
      res.status(200).send(result);
    }
  );
});
// get all the reservations
app.get("/reservations", (req, res) => {
  const sql = "Select * from Reservation";
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ err: err });
    }
    res.json(result);
  });
});
app.listen(5000, () => {
  console.log("App running at port 5000");
});
