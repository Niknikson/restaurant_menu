const Router = require("express");
const router = new Router();
const dishController = require("../controllers/dishController");
const dishSchema = require("../data/validations/dishSchema");
const validation = require("../middleware/validationMiddleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });


router.get("/", dishController.getDish);
router.delete("/:id", dishController.deleteDish);
router.get("/:id", dishController.getDishByCategory);
router.patch("/", validation(dishSchema), dishController.updateDish);
router.post("/", upload.single('file'), dishController.createDish);

module.exports = router;
