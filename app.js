const express = require("express");
const path = require("node:path");
const router = require("./routes/index.js");
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const app = express();

require('dotenv/config');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'));
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3002",
    credentials: true,
}));
app.use(cookieParser());
app.use("/", router);


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`App up and running on ${PORT}`)
});