import * as Joi from 'joi';
import { GenderTypeEnum } from 'src/admin/enums/admin.enum';

export const genderStatusValidator = Joi.string()
  .trim()
  .valid(...Object.values(GenderTypeEnum));
