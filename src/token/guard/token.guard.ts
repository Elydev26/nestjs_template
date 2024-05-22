import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';
import { Request } from 'express';
import { UserTokenDto } from '../dto/token.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenMiddlewareGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext) {
    const useToken = this.reflector.get<boolean>('token', context.getHandler());
    if (!useToken) return true;

    try {
      const response: Response = context.switchToHttp().getResponse();
      const tokenData = response.locals.tokenData as UserTokenDto;

      if (!tokenData) {
        throw new NotFoundException('authorization token not found');
      }
      return true;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
