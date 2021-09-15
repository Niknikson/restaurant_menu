const { Dish } = require("../data/models/models");
const ApiError = require("../error/ApiError");
const isUndefined = require("../utils/validator");
const {
  DELETE,
  UPDATE,
  BODY_UNDEFINED,
} = require("../constans/messages");

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
    let { id } = req.params;
    try {
      let dish = await Dish.findAll({ where: { categoryId: id } });
      res.status(200).json(dish);
    } catch (e) {
      next(ApiError.notFound(e.message));
    }
  }

  async createDish(req, res, next) {
    const { dascription, categoryId, weight, price, name, img } = req.body;
    try {
      if (!isUndefined({ dascription, categoryId, weight, price, name, img }))
        throw new Error(BODY_UNDEFINED);

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
    const { dascription, categoryId, weight, price, name, img, id } = req.body
    try {
      if (!isUndefined({ dascription, categoryId, weight, price, name, img, id }))
        throw new Error(BODY_UNDEFINED);

      await Dish.update(
        { dascription, categoryId, weight, price, name, img },
        { where: { id } }
      );
      res.status(202).json({ message: UPDATE });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteDish(req, res, next) {
    const id = req.params.id;
    try {
      await Dish.destroy({ where: { id } });
      res.status(202).json({ message: DELETE });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new DishController();
