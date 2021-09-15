const { Contact } = require("../data/models/models");
const ApiError = require("../error/ApiError");
const isUndefined = require("../utils/validator");
const {
  UPDATE,
  BODY_UNDEFINED,
} = require("../constans/messages");

class ContactController {
  async getContact(req, res, next) {
    try {
      const contact = await Contact.findAll();
      res.status(200).json(contact);
    } catch (e) {
      next(ApiError.notFound(e.message));
    }
  }

  async postContact(req, res, next) {
    const { phone, address, wifi } = req.body;
    try {
      if (!isUndefined({ phone, address, wifi }))
        throw new Error(BODY_UNDEFINED);
      
      const contact = await Contact.create({ phone, address });
      res.status(201).json(contact);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async updateContact(req, res, next) {
    const { name, address, id, wifi } = req.body;
    try {
      if (!isUndefined({ name, address, id, wifi }))
        throw new Error(BODY_UNDEFINED);
      
      await Contact.update({ name, address }, { where: { id } });
      res.status(202).json({ message: UPDATE });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new ContactController();
