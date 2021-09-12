const { Dish } = require("../data/models/models");
const ApiError = require("../error/ApiError");



class DishController {
  async getDish(req, res) {
    const { id } = req.query;
    res.json('dish');
  }
  async getById(req, res, next) {
    const { id } = req.query
     if (!id) {
       return next(ApiError.badRequest("id"));
     }
    res.json('not id');
  }

  async postDish(req, res) {}

}

module.exports = new DishController();
