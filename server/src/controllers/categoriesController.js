const ApiError = require("../error/ApiError");
const { Categories } = require("../data/models/models");
const { RES_MESSAGES } = require("../constants/responseMessages");
const STATUS_CODES = require("../constants/statusCodes");

class CategoriesController {

  async getAllCategories(req, res, next) {
    try {
      const categories = await Categories.findAll();
      res.status(STATUS_CODES.OK).json(categories);
    } catch (e) {
      next(ApiError.notFound(e.message));
    }
  }

  async getCategoryById(req, res, next) {
    const id = req.params.id;
    try {
      const category = await Categories.findOne({ where: { id } });
      res.status(STATUS_CODES.OK).json(category);
    } catch (e) {
      next(ApiError.notFound(e.message));
    }
  }

  async createCategory(req, res, next) {
    console.log(req.body);
    const { name, available } = req.body;
    try {
      const category = await Categories.create({ name, available });
      res.status(STATUS_CODES.ACCEPTED).send({ category, msg: RES_MESSAGES.CREATE});
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async updateCategory(req, res, next) {
    const { id } = req.params
    const { name, available } = req.body;
    try {
      await Categories.update({ name, available }, { where: { id } });
      res.status(STATUS_CODES.ACCEPTED).send({ msg:RES_MESSAGES.UPDATE});
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteCategory(req, res, next) {
    const {id} = req.params;
    try {
      await Categories.destroy({ where: { id } });
      res.status(STATUS_CODES.ACCEPTED).send({msg:RES_MESSAGES.DELETE});
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new CategoriesController();
