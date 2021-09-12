const Router = require('express')
const dishRouter = require('./dish')
const contactRouter = require("./contact");
const categoriesRouter = require("./categories");


const router = new Router();

router.use("/categories", categoriesRouter);
router.use("/contact", contactRouter);
router.use("/dish", dishRouter);

module.exports = router