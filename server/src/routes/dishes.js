const Router = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const dishController = require("../controllers/dishController");
const validation = require("../middleware/validationMiddleware");
const {
  dishUpdateSchema,
  dishCreateSchema,
} = require("../data/schemas/dishSchema");

const router = new Router();

router.get("/", dishController.getAllDishes);
// router.get("/top_dishes", dishController.getTopDishes);
// router.get("/dishes_without_category", dishController.getDishesWithoutCategory);
// router.get("/:id", dishController.getDishesByCategory);
router.delete("/:id", dishController.deleteDish);
router.patch("/:id", validation(dishUpdateSchema), dishController.updateDish);
router.post(
  "/",
  upload.single("file"),
  dishController.createDish
);

module.exports = router;
