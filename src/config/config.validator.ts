import * as Joi from 'joi';
import { EnvConfigEnum } from './env.enum';

export const envConfigValidator = Joi.object().keys({
  [EnvConfigEnum.PORT]: Joi.number().required(),
  [EnvConfigEnum.REFRESH_TOKEN_EXPIRATION_TIME]: Joi.string().trim().required(),
  [EnvConfigEnum.TOKEN_SECRET]: Joi.string().trim().required(),
  [EnvConfigEnum.REFRESH_TOKEN_SECRET]: Joi.string().trim().required(),
});
