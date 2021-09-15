const Router = require('express')
const dishRouter = require('./dish')
const infoRouter = require("./info");
const categoriesRouter = require("./categories");


const router = new Router();

router.use("/categories", categoriesRouter);
router.use("/info", infoRouter);
router.use("/dish", dishRouter);

module.exports = router