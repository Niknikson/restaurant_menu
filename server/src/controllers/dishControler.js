const { Dish } = require("../data/models/models");
const ApiError = require("../error/ApiError");


class DishController {
  async getDish(req, res) {
    let { categoryId } = req.query;
    let dish;
    console.log(categoryId);
    if (!categoryId) {
      dish = await Dish.findAll();
    }
     if (categoryId) {
       dish = await Dish.findAll({ where: { categoryId } });
     }
    res.json(dish);
  }

  async createDish(req, res) {
    console.log(req.body);
    try {
      const {
        dascription,
        categoryId,
        weight,
        price,
        name,
        img,
      } = req.body;
       const dish = await Dish.create({
         dascription,
         categoryId,
         weight,
         price,
         name,
         img,
       });
       return res.json(dish);
    }
    catch (e) {
       console.log(e)
    }
  }

}

module.exports = new DishController();
