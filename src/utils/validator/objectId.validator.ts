import * as Joi from 'joi';
import { Types } from 'mongoose';

export const objectIdValidator = Joi.string()
  .trim()
  .custom((value, helpers) => {
    if (Types.ObjectId.isValid(value)) {
      return value;
    }
    return helpers.message({
      '*': `please provide a valid object id for ${value}`,
    });
    // throw new Error('please provide a valid object id ');
  });

export const customObjectIdValidator = Joi.custom((value, helpers) => {
  if (Types.ObjectId.isValid(value)) {
    return value;
  }
  return helpers.message({
    '*': `please provide a valid object id for ${value}`,
  });
  // throw new Error('please provide a valid object id ');
});
