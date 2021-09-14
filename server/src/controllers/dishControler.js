const { Dish } = require("../data/models/models");
const ApiError = require("../error/ApiError");


class DishController {
  async getDish(req, res, next) {
    try {
      let dish = await Dish.findAll();
      res.status(200).json(dish);
    } catch (e) {
      next(ApiError.notFound(e.message));
    }
  }

  async getDishByGategory(req, res, next) {
    try {
      let { id } = req.params;
      let dish = await Dish.findAll({ where: { categoryId: id } });
      res.status(200).json(dish);
    } catch (e) {
      next(ApiError.notFound(e.message));
    }
  }

  async createDish(req, res, next) {
    const { dascription, categoryId, weight, price, name, img } = req.body;
    try {
      const dish = await Dish.create({
        dascription,
        categoryId,
        weight,
        price,
        name,
        img,
      });
      res.status(201).json(dish);
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
      res.status(202).json({ message: "Successfully updated." });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteDish(req, res, next) {
    const id = req.params.id;
    console.log("delete");
    try {
      await Dish.destroy({ where: { id } });
      res.status(202).json({ message: "Successfully deleted." });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new DishController();
