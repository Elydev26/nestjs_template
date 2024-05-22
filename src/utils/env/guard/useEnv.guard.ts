import {
  Injectable,
  CanActivate,
  ForbiddenException,
  ExecutionContext,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { EnvTypeEnum } from '../enum/env.enum';

@Injectable()
export class UseEnvGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const allowedEnvs = this.reflector.get<Array<EnvTypeEnum>>(
      'allowedEnvs',
      context.getHandler(),
    );
    if (!allowedEnvs) return true;

    const nodeEnv = this.configService.get<EnvTypeEnum>('NODE_ENV');

    if (allowedEnvs.includes(nodeEnv)) return true;
    else
      throw new ForbiddenException(
        `This endpoint is only allowed on node environment(s): ${JSON.stringify(
          allowedEnvs,
        )}`,
      );
  }
}
