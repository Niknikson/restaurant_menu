const Router = require("express");
const router = new Router();
const categorySchema = require("../validations/categorySchema");
const validation = require("../middleware/validationMiddleware");
const categoriesControler = require("../controllers/categoriesControler");

router.post("/", categoriesControler.createCategory);
router.get("/", categoriesControler.getAllCategories);
router.get("/:id", categoriesControler.getCategoryById);
router.delete("/:id", categoriesControler.deleteCategory);
router.patch(
  "/",
  validation(categorySchema),
  categoriesControler.updateCategory
);

module.exports = router;
