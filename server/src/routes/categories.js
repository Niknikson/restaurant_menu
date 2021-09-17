const Router = require("express");
const router = new Router();
const categorySchema = require("../data/validations/categorySchema");
const validation = require("../middleware/validationMiddleware");
const categoriesController = require("../controllers/categoriesController");

router.post("/", categoriesController.createCategory);
router.get("/", categoriesController.getAllCategories);
router.get("/:id", categoriesController.getCategoryById);
router.delete("/:id", categoriesController.deleteCategory);
router.patch(
  "/",
  validation(categorySchema),
  categoriesController.updateCategory
);

module.exports = router;
