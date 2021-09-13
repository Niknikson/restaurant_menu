const Router = require("express");
const router = new Router();
const categoriesControler = require("../controllers/categoriesControler");

router.get("/", categoriesControler.getAllCategories);
router.get("/:id", categoriesControler.getCategoryById);
router.post("/", categoriesControler.createCategory);
router.patch("/", categoriesControler.updateCategory);
router.delete("/:id", categoriesControler.deleteCategory);

module.exports = router;
