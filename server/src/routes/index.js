const Router = require('express')
const dishRouter = require('./dish')
const contactRouter = require("./contact");
const categorisRouter = require("./categoris");


const router = new Router();

router.use("/categoris", categorisRouter);
router.use("/contact", contactRouter);
router.use("/dish", dishRouter);

module.exports = router