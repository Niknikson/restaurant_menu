const yup = require("yup");

const categoryCreateSchema = yup.object({
  name: yup.string().min(3).max(30).required(),
  available: yup.boolean(),
});

const categoryUpdateSchema = yup.object({
  name: yup.string().min(3).max(30).required(),
  available: yup.boolean().required(),
});

module.exports = { categoryCreateSchema, categoryUpdateSchema };
