import * as Joi from 'joi';
import { emailValidator } from './email.validator';

export const addressValidator = Joi.object({
  country: Joi.string().trim().required(),
  city: Joi.string().trim().required(),
  state: Joi.string().trim().required(),
  zip: Joi.string().trim().required(),
});

export const draftAddressValidator = Joi.object({
  email: emailValidator.allow(null).default(null).allow(null),
  country: Joi.string().trim().allow(null),
  city: Joi.string().trim().allow(null),
  state: Joi.string().trim().allow(null),
  address: Joi.string().trim().allow(null),
  zip: Joi.string().trim().allow(null).default(null),
  coordinates: Joi.array()
    .items(Joi.number())
    .min(2)
    .max(2)
    .error(
      () =>
        new Error(
          'please provide the [lat,long] for addressCoordinates.coordinates',
        ),
    )
    .allow(null),
});
