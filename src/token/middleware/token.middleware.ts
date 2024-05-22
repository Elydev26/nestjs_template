import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../service/token.service';
import { AccountStatusEnum } from 'src/utils/enum/accountStatus.enum';

@Injectable()
export class DeviceTokenMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) return next();
    const authorizationHeader = req.headers.authorization;
    const [bearer, token] = authorizationHeader.split(' ');
    if (bearer !== 'Bearer') {
      // TODO: log error for middleware and return error for user
      throw new BadRequestException();
    }

    if (!token) {
      // TODO: log error for middleware and return error for user
      throw new BadRequestException();
    }
    const tokenData = await this.tokenService.verifyDeviceToken(token);
    res.locals.tokenData = tokenData;
    next();
  }
}

@Injectable()
export class UserTokenMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) return next();
    const authorizationHeader = req.headers.authorization;
    const [bearer, token] = authorizationHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new BadRequestException('please provide a valid JWT token');
    }

    const tokenData = await this.tokenService.verifyUserToken(token);

    // token data is not valid
    if (!tokenData) {
      throw new BadRequestException('please provide a valid JWT token');
    }

    if (tokenData.accountStatus === AccountStatusEnum.Suspend)
      throw new BadRequestException(
        'sorry your account is suspended. Kindly contact admin for further assistance',
      );

    res.locals.tokenData = tokenData;
    next();
  }
}
