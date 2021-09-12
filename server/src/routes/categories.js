const Router = require("express");
const router = new Router();
const categoriesControler = require("../controllers/categoriesControler");

router.get("/", categoriesControler.getAll);
router.post("/", categoriesControler.create);
router.get("/:id", categoriesControler.getById);

module.exports = router;
