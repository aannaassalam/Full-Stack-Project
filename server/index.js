const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const router = require("./routes/api");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

mongoose
  .connect(
    `mongodb+srv://admin:${process.env.DB_PASS}@my-project.96wsl.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    // db.connection.db.
    // console.log(db.connection.name);
    console.log("connected");
  })
  .catch((err) => console.log(err));

app.use("/api", router);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server Running!", port));
