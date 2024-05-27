import { PickType } from '@nestjs/swagger';
import { User } from '../models/user.model';

export class CreateAdminDto extends PickType(User, [
  'firstName',
  'lastName',
  'userName',
  'email',
  'password',
  'phoneNumber',
] as const) {}

export class AccountLoginDto extends PickType(User, [
  'userName',
  'password',
] as const) {}

export class AccountForgetPasswordDto extends PickType(User, [
  'email',
] as const) {}

export class ResetPasswordDto extends PickType(User, [
  'password',
  'email',
] as const) {}

export class UpdatePasswordDto {
  currentPassword: string;
  password: string;
}
