const Router = require("express");
const router = new Router();
const validation = require("../middleware/validationMiddleware");
const categoriesController = require("../controllers/categoriesController");
const {
  categoryCreateSchema,
  categoryUpdateSchema,
} = require("../data/schemas/categorySchema");

router.get("/", categoriesController.getAllCategories);
router.get("/:id", categoriesController.getCategoryById);
router.delete("/:id", categoriesController.deleteCategory);
router.post(
  "/",
  validation(categoryCreateSchema),
  categoriesController.createCategory
);
router.patch(
  "/:id",
  validation(categoryUpdateSchema),
  categoriesController.updateCategory
);

module.exports = router;
