const Router = require("express");
const router = new Router();
const dishControler = require("../controlers/dishControler");

router.get("/", dishControler.getDish);
router.get('/:id', dishControler.getById);
router.post('/', dishControler.postDish);

module.exports = router;
