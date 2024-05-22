import { SetMetadata } from '@nestjs/common';
import { EnvTypeEnum } from '../enum/env.enum';

export const AllowEnvs = (envs: Array<EnvTypeEnum>) =>
  SetMetadata('allowedEnvs', envs);
