require("dotenv").config();
const cors = require("cors");
const express = require("express");
const sequelize = require("./src/config/db");
const router = require("./src/routes/index");
const models = require("./src/data/models/models");
const errorHandler = require("./src/middleware/errorHandlingMiddleware");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json({ limit: "150mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/menu", router);

// last Middleware
app.use(errorHandler)

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
