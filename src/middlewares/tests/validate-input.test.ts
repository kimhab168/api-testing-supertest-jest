import validateRequest from "../validate-input";
import { Request, Response, NextFunction } from "express";
import Joi from "joi";
// import { InputSchema } from "../validate-input";
import { InvalidInputError } from "@/utils/errors";
describe("validateRequest Middleware", () => {
  let nextFunction: NextFunction;

  //before any test do this statement
  beforeEach(() => {
    nextFunction = jest.fn();
  });

  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required().positive(),
    category: Joi.string().required(),
    stock: Joi.number().required().positive(),
  });

  //case1:
  it("should call next if validation passes", () => {
    const req = {
      body: {
        name: "",
        price: 0,
        category: "",
        stock: 0,
      },
    } as Request;

    const res = {} as Response;

    validateRequest(schema)(req, res, nextFunction);

    // expect the test passes if the nextFunction has been called in validaterequest check
    expect(nextFunction).toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalledTimes(1);
  });

  //case2:
  it("should throw InvalidInputError if validation fails", () => {
    const req = {
      body: {
        name: "habhab",
        price: 168,
        category: "yes",
        stock: -100,
      },
    } as Request;

    const res = {} as Response;

    validateRequest(schema)(req, res, nextFunction);

    expect(nextFunction).toHaveBeenCalledWith(expect.any(InvalidInputError));

    //if next called 2 times it mean error if you want to know clearly go to check validateRequest
    expect(nextFunction).toHaveBeenCalledTimes(1);
  });

  //case3:
  it("should throw InvalidInputError if unknown properties are present", () => {
    const req = {
      body: {
        name: "habhab",
        price: 168,
        category: "yes",
        stock: 100,
        unknown: "should not be this property",
      },
    } as Request;

    const res = {} as Response;

    validateRequest(schema)(req, res, nextFunction);

    expect(nextFunction).toHaveBeenCalledWith(expect.any(InvalidInputError));
    expect(nextFunction).toHaveBeenCalledTimes(1);
  });
});
