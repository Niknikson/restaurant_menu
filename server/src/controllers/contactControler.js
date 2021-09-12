const { Contact } = require("../data/models/models");
const ApiError = require("../error/ApiError");

class ContactController {
  async postContact(req, res) {
    const { phone, adres } = req.body;
    const contact = await Contact.create({ phone, adres });
     return res.json(contact);
  }

  async getContact(req, res) {
    const contacts = await Contact.findAll()
    res.json(contacts);
  }
}

module.exports = new ContactController();
