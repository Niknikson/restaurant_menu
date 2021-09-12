require("dotenv").config();
const cors = require("cors");
const sequelize = require("./src/config/db");
const express = require("express");
const models = require("./src/data/models/models");
const router = require("./src/routes/index");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/restoran", router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server startetd on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
