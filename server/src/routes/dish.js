const Router = require("express");
const router = new Router();
const dishControler = require("../controllers/dishControler");

router.get("/", dishControler.getDish);
router.post("/", dishControler.createDish);
router.patch("/", dishControler.updateDish);
router.delete("/:id", dishControler.deleteDish);

module.exports = router;
