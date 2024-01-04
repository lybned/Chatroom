const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DBCONNECTION)
  .then(() => {console.log("Connection successful!")})
  .catch((error) => {
    console.log(error)
  })

const server = app.listen(process.env.PORT, () => {

  console.log(`Server Started on Port ${process.env.PORT}`);

})