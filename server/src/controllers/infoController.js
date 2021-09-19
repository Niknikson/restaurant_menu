const ApiError = require("../error/ApiError");
const { Info } = require("../data/models/models");
const { RES_MESSAGES } = require("../constants/responseMessages");
const STATUS_CODES = require("../constants/statusCodes");


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
      res.status(STATUS_CODES.OK).json(contact);
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

      await Info.update({ phone, address, wifi }, { where: { id } });
      res.status(202).send(String(RES_MESSAGES.UPDATE));
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new InfoController();
