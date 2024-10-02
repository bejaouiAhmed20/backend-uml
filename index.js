const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
const conn = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "",
  database: "Restaurants",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("MySql has connected successfully :) ");
});
//the setting the place of the 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("hello");
});

app.post(
  "/addDestination",
  upload.fields([{ name: "image" }, { name: "menu" }]),
  (req, res) => {
    const { name, tables, adresse, description } = req.body;
    const image = req.files['image'] ? `/images/${req.files['image'][0].filename}` : null; // Handle destination image
  const menu = req.files['menu'] ? `/images/${req.files['menu'][0].filename}` : null; // Handle menu image

    const sql ="INSERT INTO Destination (name, tables, image, adresse, description,menu) VALUES (?,?,?,?,?,?)";
    conn.query(
      sql,
      [name, tables, image, adresse, description,menu],
      (err, result) => {
        if (err) {
          return res.json({ err });
        }
        res.json({ message: "Destination added successfully", result });
      }
    );
  }
);

app.get("/destinations", (req, res) => {
  const sql = "Select * from Destination";
  conn.query(sql, (err, result) => {
    if (err) {
      return res.json({ err: err });
    }
    res.json(result);
  });
});

app.listen(5000, () => {
  console.log("App running at port 5000");
});
