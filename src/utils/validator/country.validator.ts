import * as Joi from 'joi';
import { CountryEnum } from '../enum/country.enum';

export const countryValidator = Joi.string()
  .trim()
  .valid(...Object.values(CountryEnum));
