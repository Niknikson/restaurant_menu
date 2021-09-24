const yup = require("yup");

const infoSchema = yup.object({
  phone: yup.string().max(30),
  address: yup.string().max(30),
  wifi: yup.string().max(10),
});

module.exports = infoSchema;
