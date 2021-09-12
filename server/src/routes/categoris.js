const Router = require("express");
const router = new Router();
const categorisControler = require("../controlers/categorisControler");

router.get("/", categorisControler.getAll);
router.get("/:id", categorisControler.getById);
router.post("/", categorisControler.create);

module.exports = router;
