const { Dish } = require("../data/models/models");
const { cloudinary } = require("../config/cloudinary.config");
const ApiError = require("../error/ApiError");
const STATUS_CODES = require("../constants/statusCodes");
const { RES_MESSAGES } = require("../constants/responseMessages");
const { Op } = require("sequelize");

class DishController {

  async getAllDishes(req, res, next) {
    try {
      let dishes
      if (req.query.search) {
        dishes = await Dish.findAll({ where: { name: { [Op.iLike]: '%' + req.query.search + '%' } } });
      } else if (req.query.dish) {
        dishes = await Dish.findAll({ where: { categoryId: null } });
      } else {
        dishes = await Dish.findAll({ where: { ...req.query } });
      }

      res.status(STATUS_CODES.OK).json(dishes);
    } catch (e) {
      next(ApiError.notFound(e.message));
    }
  }

  // async getTopDishes(req, res, next) {
  //   try {
  //     let dishes = await Dish.findAll({ where: { top: true } });
  //     res.status(STATUS_CODES.OK).json(dishes);
  //   } catch (e) {
  //     next(ApiError.notFound(e.message));
  //   }
  // }

  //   async getDishesWithoutCategory(req, res, next) {
  //   try {
  //     let dishes = await Dish.findAll({ where: { categoryId: null } });
  //     res.status(STATUS_CODES.OK).json(dishes);
  //   } catch (e) {
  //     next(ApiError.notFound(e.message));
  //   }
  // }

  // async getDishesByCategory(req, res, next) {
  //   let { id } = req.params;
  //   try {
  //     let dish = await Dish.findAll({ where: { categoryId: id } });
  //     res.status(STATUS_CODES.OK).json(dish);
  //   } catch (e) {
  //     next(ApiError.notFound(e.message));
  //   }
  // }

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
    const { description, categoryId, weight, price, top, name, img, available } = req.body;
    const { id } = req.params;
    try {
      await Dish.update(
        { description, categoryId, weight, price, name, img, top, available },
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
