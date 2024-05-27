import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { AccountLoginDto, CreateAdminDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';
import { verifyPassword } from 'src/utils/common/function/password.function';

@Injectable()
export class CreateAccountGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    try {
      const req: Request = context.switchToHttp().getRequest();
      const value: CreateAdminDto = req.body;

      if (!value)
        throw new BadRequestException(
          'please enter at least one information about this account',
        );
      //check if organization exists
      const emailExists = await this.userService.findOne({
        email: value.email,
      });
      if (emailExists) {
        throw new ConflictException(
          'an existing account already has this email',
        );
      }
      const userNameExists = await this.userService.findOne({
        userName: value.userName,
      });

      if (userNameExists) {
        throw new ConflictException(
          'an existing account already has this username',
        );
      }
      return true;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}

@Injectable()
export class LoginAccountGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    try {
      const req: Request = context.switchToHttp().getRequest();
      const value: AccountLoginDto = req.body;

      if (!value)
        throw new BadRequestException('please enter username and password');
      //check if admin exists
      const userExists = await this.userService.findOne({
        userName: value.userName,
      });
      const passwordExists = await verifyPassword(
        value.password,
        userExists.password,
      );
      if (!userExists || !passwordExists) {
        throw new ConflictException('Incorrect username or password');
      }
      return true;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
