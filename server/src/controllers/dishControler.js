const { Dish } = require("../data/models/models");
const ApiError = require("../error/ApiError");
const { DELETE, UPDATE, ID_UNDEFINED } = require("../constans/messages");

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
    const { dascription, categoryId, weight, price, name, img, top } = req.body;
    try {
      if (!id) throw new Error(ID_UNDEFINED);

      const dish = await Dish.create({
        dascription,
        categoryId,
        weight,
        price,
        name,
        img,
        top,
      });
      res.status(201).json(dish);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async updateDish(req, res, next) {
    const { dascription, categoryId, weight, price, top, name, img, id } = req.body
    try {
      if (!id) throw new Error(ID_UNDEFINED);

      await Dish.update(
        { dascription, categoryId, weight, price, name, img, top },
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
