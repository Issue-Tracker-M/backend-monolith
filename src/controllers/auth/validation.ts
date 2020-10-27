//dependencies
import Joi from "joi";
// types
import { createValidationMiddleware } from "../../utils/createValidationMiddleware";

const passwordSchema = Joi.string().min(8).max(64).required();

const loginSchema = Joi.object().keys({
  credential: Joi.alternatives()
    .try(
      Joi.string().lowercase().label("username").alphanum(),
      Joi.string().lowercase().label("email").email({ minDomainSegments: 2 })
    )
    .required(),
  password: passwordSchema,
});

const registerSchema = Joi.object().keys({
  first_name: Joi.string().alphanum().required().max(64),
  last_name: Joi.string().alphanum().required().max(64),
  username: Joi.string().lowercase().alphanum().required().max(64),
  password: passwordSchema,
  email: Joi.string().lowercase().email({ minDomainSegments: 2 }).required(),
});

const emailConfirmation = Joi.object().keys({
  token: Joi.string().required(),
});

export const validateLoginInput = createValidationMiddleware(loginSchema);
export const validateRegisterInput = createValidationMiddleware(registerSchema);
export const validateEmailConfirmation = createValidationMiddleware(
  emailConfirmation
);
