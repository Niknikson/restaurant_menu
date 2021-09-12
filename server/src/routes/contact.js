const Router = require("express");
const router = new Router();
const contactControler = require("../controlers/contactControler");

router.get("/", contactControler.getContact);
router.post("/", contactControler.postContact);


module.exports = router;
