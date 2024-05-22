import * as Joi from 'joi';
export const emailValidator = Joi.string().trim().email();
