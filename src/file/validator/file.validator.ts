import * as Joi from 'joi';
import { ACLEnum, FilePathEnum } from '../enum/file.enum';
import { objectIdValidator } from 'src/utils/validator/objectId.validator';

export const fileValidator = Joi.object({
  Path: Joi.string()
    .trim()
    .required()
    .error(() => new Error('please provide the Path. e.g /user/profile ')),
  ACL: Joi.string()
    .trim()
    .valid(...Object.values(ACLEnum))
    .required(),
  createdBy: Joi.string().trim().required(),
  organization: Joi.string().trim().required(),
});

export const populatedFileValidator = Joi.object({
  Path: Joi.string()
    .trim()
    .error(() => new Error('please provide the Path. e.g /user/profile ')),
  ACL: Joi.string()
    .trim()
    .valid(...Object.values(ACLEnum)),
  Key: Joi.string(),
  Bucket: Joi.string(),
  Location: Joi.string(),
  Size: Joi.number(),
  id: objectIdValidator,
});

export const assetPathValidator = Joi.string()
  .valid(...Object.values(FilePathEnum))
  .required();
