const yup = require("yup");

const infoSchema = yup.object({
  phone: yup.string().min(10).max(30),
  address: yup.string().min(5).max(30),
  wifi: yup.string().min(3).max(10),
  // isNew: yup.boolean(),
});

module.exports = infoSchema;
