const { Categories } = require("../data/models/models");
const ApiError = require("../error/ApiError");

class CategorisController {
  async getAll(req, res) {
    res.json("categories");
    }
    
  async getById(req, res) {}

  async create(req, res) {
    const { name } = req.body
    // const category = await Categories.create({ name })
    // return res.json(category)
  }
}

module.exports = new CategorisController();
