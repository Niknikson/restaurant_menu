const Router = require("express");
const router = new Router();
const dishControler = require("../controllers/dishControler");

router.get("/", dishControler.getDish);
router.post("/", dishControler.createDish);

module.exports = router;
