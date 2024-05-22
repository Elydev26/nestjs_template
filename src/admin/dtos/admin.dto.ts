import { PickType } from '@nestjs/swagger';
import { Admin } from '../models/admin.model';

export class CreateAdminDto extends PickType(Admin, [
  'firstName',
  'lastName',
  'userName',
  'email',
  'password',
  'phoneNumber',
] as const) {}

export class AccountLoginDto extends PickType(Admin, [
  'userName',
  'password',
] as const) {}

export class AccountForgetPasswordDto extends PickType(Admin, [
  'email',
] as const) {}

export class ResetPasswordDto extends PickType(Admin, [
  'password',
  'email',
] as const) {}

export class UpdatePasswordDto {
  currentPassword: string;
  password: string;
}
