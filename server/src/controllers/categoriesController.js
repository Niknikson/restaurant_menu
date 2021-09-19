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
    const { name } = req.body;
    try {
      await Categories.create({ name });
      res.status(STATUS_CODES.CREATED).send(String(RES_MESSAGES.CREATE));
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async updateCategory(req, res, next) {
    const { id } = req.params
    const { name, available } = req.body;
    try {
      await Categories.update({ name, available }, { where: { id } });
      res.status(STATUS_CODES.ACCEPTED).send(String(RES_MESSAGES.UPDATE));
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteCategory(req, res, next) {
    const {id} = req.params;
    try {
      await Categories.destroy({ where: { id } });
      res.status(STATUS_CODES.ACCEPTED).send(String(RES_MESSAGES.DELETE));
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new CategoriesController();
