const yup = require("yup");

const dishCreateSchema = yup.object({
  name: yup.string().min(3).max(30).required(),
  description: yup.string().min(10).max(255),
  price: yup.string().min(1).max(30),
  weight: yup.string().min(2).max(30),
  available: yup.boolean(),
  top: yup.boolean(),
});

const dishUpdateSchema = yup.object({
  name: yup.string().min(3).max(30).required(),
  description: yup.string().min(10).max(255).required(),
  price: yup.string().min(1).max(30).required(),
  weight: yup.string().min(2).max(30).required(),
  categoryId: yup.string().required(),
  available: yup.boolean().required(),
  top: yup.boolean().required(),
});


module.exports = { dishCreateSchema, dishUpdateSchema };
