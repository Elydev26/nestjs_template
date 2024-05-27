import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import {
  AccountForgetPasswordDto,
  AccountLoginDto,
  CreateAdminDto,
} from '../dtos/user.dto';
import { verifyPassword } from 'src/utils/common/function/password.function';
import { RefreshTokenDto } from 'src/token/dto/refreshToken.dto';
import { HttpCodesEnum } from 'src/token/enum/httpCodes.enum';
import { UserService } from '../services/user.service';

@Injectable()
export class LoginAccountPipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}
  async transform(value: AccountLoginDto) {
    /** the repositioning is to ensure that the account details is checked before OTP is.
    If the user enters incorrect details, they don't have to send a new OTP. since we expire an OTP once used. 
    */
    const foundAccount = await this.userService.findOneOrErrorOut(
      {
        userName: value.userName,
      },
      null,
      new HttpException(
        {
          status: HttpCodesEnum.InvalidCredentials,
          message: 'Invalid Credentials',
        },
        HttpCodesEnum.InvalidCredentials,
      ),
    );

    if (!foundAccount) {
      throw new HttpException(
        {
          status: HttpCodesEnum.InvalidCredentials,
          message: 'Invalid Credentials',
        },
        HttpCodesEnum.InvalidCredentials,
      );
    }

    const validPassword = await verifyPassword(
      value.password,
      foundAccount.password,
    );
    if (!validPassword) {
      throw new HttpException(
        {
          status: HttpCodesEnum.InvalidCredentials,
          message: 'Invalid Credentials',
        },
        HttpCodesEnum.InvalidCredentials,
      );
    }
    return value;
  }
}

@Injectable()
export class AccountRefreshTokenPipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}
  async transform(data: RefreshTokenDto) {
    const { refreshToken } = data;

    const foundAccount = await this.userService.findOne({ refreshToken });

    if (!foundAccount)
      throw new NotFoundException('user not found with this refresh token');

    return data;
  }
}

@Injectable()
export class ForgetPasswordPipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}
  async transform(value: AccountForgetPasswordDto) {
    const { email } = value;
    const convertEmailToLowerCase = email.toLowerCase();
    const accountExists = await this.userService.propExists({
      email: convertEmailToLowerCase,
    });

    if (!accountExists)
      throw new NotFoundException(
        'user not found, kindly check if the email is entered correctly',
      );
    return value;
  }
}

@Injectable()
export class RegisterAccountPipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}

  async transform(value: CreateAdminDto) {
    const { email, userName } = value;

    // separately validating the email when it exists
    if (email || userName) {
      const lowercaseEmail = email.toLowerCase();
      value.email = lowercaseEmail;

      const emailUsernameAlreadyTaken = await this.userService.propExists({
        email,
        userName,
      });
      if (emailUsernameAlreadyTaken)
        throw new ConflictException('email already taken');
    }
    return value;
  }
}
