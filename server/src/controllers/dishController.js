const { Dish } = require("../data/models/models");
const { cloudinary } = require("../config/cloudinary.config");
const ApiError = require("../error/ApiError");
const STATUS_CODES = require("../constants/statusCodes");
const { RES_MESSAGES } = require("../constants/responseMessages");
const { Op } = require("sequelize");

class DishController {

  async getAllDishes(req, res, next) {
    try {
      let params = getCorrectParams(req.query)
      const dishes = await Dish.findAll({ ...params });
      res.status(STATUS_CODES.OK).json(dishes);
    } catch (e) {
      next(ApiError.notFound(e.message));
    }
  }

  async createDish(req, res, next) {
    const { description, categoryId, available, weight, price, name, top } = JSON.parse(req.body.data)
    try {
       const uploadedResponse = await cloudinary.uploader.upload(req.file.path);
       const { url } = uploadedResponse;
       const dish = await Dish.create({
        description,
        available,
        categoryId,
        weight,
        price,
        name,
        img: url,
        top,
       });
      console.log(dish.dataValues)
      res.status(STATUS_CODES.CREATED).json({ data: dish.dataValues, msg: RES_MESSAGES.CREATE });

    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async updateDish(req, res, next) {
    const { id } = req.params;
    try {
      await Dish.update(
        { ...req.body},
        { where: { id } }
      );
      res.status(STATUS_CODES.ACCEPTED).send({msg: RES_MESSAGES.UPDATE });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteDish(req, res, next) {
    const id = req.params.id;
    try {
      await Dish.destroy({ where: { id } });
      res.status(STATUS_CODES.ACCEPTED).send({msg: RES_MESSAGES.DELETE });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new DishController();
