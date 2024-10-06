import Joi from "joi";

const productCreateSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required().positive(),
  category: Joi.string().required(),
  stock: Joi.number().required().positive(),
});
export default productCreateSchema;
