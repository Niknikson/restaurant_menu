const { Categories } = require("../data/models/models");
const ApiError = require("../error/ApiError");

class CategoriesController {
  async getAllCategories(req, res, next) {
    try {
      const categories = await Categories.findAll();
      res.status(200).json(categories);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getCategoryById(req, res, next) {
    const id = req.params.id;
    try {
      const category = await Categories.findOne({ where: { id } });
      res.status(200).json(category);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async createCategory(req, res, next) {
    const { name } = req.body;
    try {
      const category = await Categories.create({ name });
      res.status(200).json(category);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async updateCategory(req, res, next) {
    const { name, id, available } = req.body;
    try {
       await Categories.update({ name, available }, { where: {id} });
       res.json({ message: "Successfully updated." });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteCategory(req, res, next) {
    const id = req.params.id;
    try {
      await Categories.destroy({ where: { id } });
      res.json({ message: "Successfully deleted ." });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  
}

module.exports = new CategoriesController();
