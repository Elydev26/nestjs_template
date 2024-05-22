import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { DeviceTokenDto, UserIdDto, UserTokenDto } from '../dto/token.dto';
import { FuturexWebsiteHttpCodesEnum } from '../enum/httpCodes.enum';
import { JwtService } from '@nestjs/jwt';
import { envConfiguration } from 'src/utils/env/config/env.config';

@Injectable()
export class TokenService {
  private expiresIn: string;
  private tokenSecret: string;
  private refreshTokenExpiration: string;
  private forgetPasswordExpiresIn: string;
  private jwtService: JwtService;

  constructor(private config: ConfigService) {
    this.expiresIn = this.config.get(envConfiguration.TOKEN_EXPIRATION_TIME);
    this.tokenSecret = this.config.get(envConfiguration.TOKEN_SECRET);
    this.refreshTokenExpiration = config.get(
      envConfiguration.REFRESH_TOKEN_EXPIRATION_TIME,
    );
    this.forgetPasswordExpiresIn = config.get(
      envConfiguration.RESET_PASSWORD_TOKEN_EXPIRATION_TIME,
    );
  }

  tokenize({
    data,
    expiresIn = this.expiresIn,
  }: {
    data: UserIdDto | Record<string, unknown>;
    expiresIn?: string;
  }): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(data, this.tokenSecret, { expiresIn }, (err, decoded) => {
        if (err) reject(new InternalServerErrorException(err));
        resolve(decoded);
      });
    });
  }

  tokenizeForgetPasswordToken({
    data,
    expiresIn = this.forgetPasswordExpiresIn,
  }: {
    data: UserIdDto | Record<string, unknown>;
    expiresIn?: string;
  }): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(data, this.tokenSecret, { expiresIn }, (err, decoded) => {
        if (err) reject(new InternalServerErrorException(err));
        resolve(decoded);
      });
    });
  }

  verifyDeviceToken(token: string): Promise<DeviceTokenDto> {
    return new Promise((resolve) => {
      const tokenSecret = this.config.get(envConfiguration.TOKEN_SECRET);
      jwt.verify(token, tokenSecret, (err, decoded: DeviceTokenDto) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            throw new HttpException(
              {
                status: FuturexWebsiteHttpCodesEnum.TokenExpiredError,
                message: 'token expired',
              },
              FuturexWebsiteHttpCodesEnum.TokenExpiredError,
            );
          }
          // TODO: log token error
          throw new BadRequestException(err.message);
        }
        resolve(decoded);
      });
    });
  }
  verifyExpiredToken(token: string) {
    return new Promise((resolve, reject) => {
      const tokenSecret = this.config.get(envConfiguration.TOKEN_SECRET);
      jwt.verify(
        token,
        tokenSecret,
        { ignoreExpiration: true },
        (err, decoded) => {
          if (err) reject(new UnauthorizedException(err.message));
          resolve(decoded);
        },
      );
    });
  }

  refreshToken({
    id,
    expiresIn = this.refreshTokenExpiration,
  }: {
    id: string;
    expiresIn?: string;
  }): Promise<string> {
    return new Promise((resolve, reject) => {
      const tokenSecret = this.config.get(
        envConfiguration.REFRESH_TOKEN_SECRET,
      );

      jwt.sign({ id }, tokenSecret, { expiresIn }, (err, decoded) => {
        if (err) reject(new InternalServerErrorException(err));

        resolve(decoded);
      });
    });
  }

  // async verifyRefreshToken(token: string): Promise<any> {
  //   const tokenSecret = this.config.get(envConfiguration.REFRESH_TOKEN_SECRET);
  //   try {
  //     const decoded = await jwt.decode(token, tokenSecret);
  //     return decoded;
  //   } catch (err) {
  //     throw new UnauthorizedException(err);
  //   }
  // }

  verifyRefreshToken(token: string): Promise<UserTokenDto> {
    return new Promise((resolve) => {
      const tokenSecret = this.config.get(
        envConfiguration.REFRESH_TOKEN_SECRET,
      );
      jwt.verify(token, tokenSecret, (err, decoded: UserTokenDto) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            throw new HttpException(
              {
                status: FuturexWebsiteHttpCodesEnum.RefreshTokenExpiredError,
                message: 'refesh token expired',
              },
              FuturexWebsiteHttpCodesEnum.RefreshTokenExpiredError,
            );
          }
          throw new BadRequestException(err.message);
        }
        resolve(decoded);
      });
    });
  }

  verifyUserToken(token: string): Promise<UserTokenDto> {
    return new Promise((resolve) => {
      const tokenSecret = this.config.get(envConfiguration.TOKEN_SECRET);
      jwt.verify(token, tokenSecret, (err, decoded: UserTokenDto) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            throw new HttpException(
              {
                status: FuturexWebsiteHttpCodesEnum.TokenExpiredError,
                message: 'token expired',
              },
              FuturexWebsiteHttpCodesEnum.TokenExpiredError,
            );
          }
          throw new BadRequestException(err.message);
        }
        resolve(decoded);
      });
    });
  }

  decode(token: string) {
    return jwt.decode(token, { complete: true });
  }
}
