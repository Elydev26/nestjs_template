import * as Joi from 'joi';
import { GenderTypeEnum } from 'src/user/enums/user.enum';

export const genderStatusValidator = Joi.string()
  .trim()
  .valid(...Object.values(GenderTypeEnum));
