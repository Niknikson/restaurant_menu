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

  async createDish(req, res, next) {
    const { dascription, categoryId, weight, price, name, img } = req.body;
    console.log('create dish')
    try {
      const dish = await Dish.create({
        dascription,
        categoryId,
        weight,
        price,
        name,
        img,
      });
      res.status(200).json(dish);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async updateDish(req, res, next) {
    const { dascription, categoryId, weight, price, name, img, id } = req.body;
    try {
      await Dish.update(
        { dascription, categoryId, weight, price, name, img },
        { where: { id } }
      );
      res.json({ message: "Successfully updated." });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteDish(req, res, next) {
    const id = req.params.id;
    console.log('delete')
    try {
      await Dish.destroy({ where: { id } });
      res.json({ message: "Successfully deleted ." });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new DishController();
