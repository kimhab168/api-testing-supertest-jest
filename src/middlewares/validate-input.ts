import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { InvalidInputError } from "@/utils/errors";

export const InputSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required().positive(),
  category: Joi.string().required(),
  stock: Joi.number().required().positive(),
});

const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      console.log(error);

      const errors = error.details.map((detail) => detail.message);
      return next(
        new InvalidInputError({
          message: error.details.map((detail) => detail.message).toString(),
          errors: errors.toString(),
        })
      );
    }

    next();
  };
};

export default validateRequest;
