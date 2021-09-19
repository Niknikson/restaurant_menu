const Router = require('express')
const infoRouter = require("./info");
const dishRouter = require('./dishes')
const categoriesRouter = require("./categories");


const router = new Router();

router.use("/categories", categoriesRouter);
router.use("/info", infoRouter);
router.use("/dish", dishRouter);

module.exports = router