const { Info } = require("../data/models/models");
const ApiError = require("../error/ApiError");
const { UPDATE, ID_UNDEFINED } = require("../constants/messages");

const postInfo = async (req, res, next) => {
  const { phone, address, wifi } = req.body;
  try {
    const contact = await Info.create({ phone: "", address: "", wifi: "" });
    res.status(201).json(contact);
  } catch (e) {
    next(ApiError.badRequest(e.message));
  }
};

class InfoController {
  async getInfo(req, res, next) {
    try {
      const contact = await Info.findAll();
      res.status(200).json(contact);
    } catch (e) {
      next(ApiError.notFound(e.message));
    }
  }

  async updateInfo(req, res, next) {
    const { phone, address, wifi, id, isNew } = req.body;
    try {
      if (isNew) {
        return postInfo(req, res, next);
      }

      if (!id) throw new Error(ID_UNDEFINED);

      await Info.update({ phone, address, wifi }, { where: { id } });
      res.status(202).json({ message: UPDATE });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new InfoController();
