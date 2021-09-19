const Router = require("express");
const router = new Router();
const infoSchema = require("../data/schemas/infoSchema");
const infoController = require("../controllers/infoController");
const validation = require("../middleware/validationMiddleware");

router.get("/", infoController.getInfo);
router.patch("/", validation(infoSchema), infoController.updateInfo);

module.exports = router;
