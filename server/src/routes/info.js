const Router = require("express");
const router = new Router();
const infoSchema = require("../validations/infoSchema");
const infoControler = require("../controllers/infoControler");
const validation = require("../middleware/validationMiddleware");

router.get("/", infoControler.getInfo);
//router.post("/", validation(infoSchema), infoControler.postInfo);
router.patch("/", validation(infoSchema), infoControler.updateInfo);

module.exports = router;
