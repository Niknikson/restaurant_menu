const Router = require("express");
const router = new Router();
const contactControler = require("../controllers/contactControler");

router.get("/", contactControler.getContact);
router.post("/", contactControler.postContact);
router.patch("/", contactControler.updateContact);

module.exports = router;
