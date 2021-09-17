const { Dish } = require("../data/models/models");
const { cloudinary } = require("../config/cloudinary.config");
const ApiError = require("../error/ApiError");
const { DELETE, UPDATE, ID_UNDEFINED } = require("../constants/messages");

class DishController {
  async getDish(req, res, next) {
    try {
      let dish = await Dish.findAll();
      res.status(200).json(dish);
    } catch (e) {
      next(ApiError.notFound(e.message));
    }
  }

  async getDishByCategory(req, res, next) {
    let { id } = req.params;
    try {
      let dish = await Dish.findAll({ where: { categoryId: id } });
      res.status(200).json(dish);
    } catch (e) {
      next(ApiError.notFound(e.message));
    }
  }

  async createDish(req, res, next) {
    let { description, categoryId, weight, price, name, top, photo } = req.body;

    console.log(req.file);
    try {
      //const uploadedResponse = await cloudinary.uploader.upload(req.file.path);
  
      res.json({ uploadedResponse });
    } catch (e) {
      console.log("error", e.message);
    }

    try {
      // const dish = await Dish.create({
      //   description,
      //   categoryId,
      //   weight,
      //   price,
      //   name,
      //   img,
      //   top,
      // });
      // res.status(201).json(dish);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async updateDish(req, res, next) {
    const { description, categoryId, weight, price, top, name, img, id } =
      req.body;
    try {
      if (!id) throw new Error(ID_UNDEFINED);

      await Dish.update(
        { description, categoryId, weight, price, name, img, top },
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
