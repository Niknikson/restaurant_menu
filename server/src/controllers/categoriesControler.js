const { Categories } = require("../data/models/models");
const ApiError = require("../error/ApiError");
const isUndefined = require("../utils/validator");
const {
  DELETE,
  UPDATE,
  NAME_UNDEFINED,
  BODY_UNDEFINED,
} = require("../constans/messages");

class CategoriesController {
  async getAllCategories(req, res, next) {
    try {
      const categories = await Categories.findAll();
      res.status(200).json(categories);
    } catch (e) {
      next(ApiError.notFound(e.message));
    }
  }

  async getCategoryById(req, res, next) {
    const id = req.params.id;
    try {
      const category = await Categories.findOne({ where: { id } });
      res.status(200).json(category);
    } catch (e) {
      next(ApiError.notFound(e.message));
    }
  }

  async createCategory(req, res, next) {
    const { name } = req.body;
    try {
      if (!name) throw new Error(NAME_UNDEFINED);
        
      const category = await Categories.create({ name });
      res.status(201).json(category);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async updateCategory(req, res, next) {
    const { name, id, available } = req.body;
    try {
      if (!isUndefined({ name, id, available }))
        throw new Error(BODY_UNDEFINED);
      
      await Categories.update({ name, available }, { where: { id } });
      res.status(202).json({ message: UPDATE });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteCategory(req, res, next) {
    const id = req.params.id;
    try {
      await Categories.destroy({ where: { id } });
      res.status(202).json({ message: DELETE });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new CategoriesController();
