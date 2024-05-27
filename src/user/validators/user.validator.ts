import * as Joi from 'joi';
import { emailValidator } from 'src/utils/validator/email.validator';
import { passwordValidator } from 'src/utils/validator/password.validator';
import { phoneNumberValidator } from 'src/utils/validator/phoneNumber.validator';

export const accountLoginValidator = Joi.object({
  userName: Joi.string().trim().required(),
  password: passwordValidator.required(),
});

export const createAccountValidator = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  userName: Joi.string().trim().required(),
  email: emailValidator.required(),
  password: passwordValidator.required(),
  phoneNumber: phoneNumberValidator.required(),
});
