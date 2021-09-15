const yup = require("yup");

const categorySchema = yup.object({
  name: yup.string().min(3).max(30).required(),
  available: yup.boolean().required(),
});

module.exports = categorySchema;
