const { Contact } = require("../data/models/models");
const ApiError = require("../error/ApiError");

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
    const { phone, address } = req.body;
    try {
      const contact = await Contact.create({ phone, address });
      res.status(201).json(contact);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async updateContact(req, res, next) {
    const { name, address, id } = req.body;
    try {
      await Contact.update({ name, address }, { where: { id } });
      res.status(202).json({ message: "Successfully updated." });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new ContactController();
