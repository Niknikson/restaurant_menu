const Router = require("express");
const router = new Router();
const dishControler = require("../controllers/dishControler");
const dishSchema = require("../validations/dishSchema");
const validation = require("../middleware/validationMiddleware");

router.get("/", dishControler.getDish);
router.delete("/:id", dishControler.deleteDish);
router.get("/:id", dishControler.getDishByGategory);
router.post("/", validation(dishSchema), dishControler.createDish);
router.patch("/", validation(dishSchema), dishControler.updateDish);

module.exports = router;
