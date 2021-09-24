const ApiError = require("../error/ApiError");
const { Info } = require("../data/models/models");
const { RES_MESSAGES } = require("../constants/responseMessages");
const STATUS_CODES = require("../constants/statusCodes");

class InfoController {
  async getInfo(req, res, next) {
    try {

      let info = await Info.findAll();
      
      if (info.length == 0) info =  await Info.create()

      res.status(STATUS_CODES.OK).json(info[0]);

    } catch (e) {
      next(ApiError.notFound(e.message));
    }
  }

  async updateInfo(req, res, next) {
    const { phone, address, wifi, id } = req.body;
    console.log(req.body)
    try { 
      await Info.update({ phone, address, wifi }, { where: { id } })
      res.status(202).send({ msg: RES_MESSAGES.UPDATE});
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new InfoController();
