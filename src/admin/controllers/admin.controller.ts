import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from '../services/admin.service';
import { CreateAccountGuard, LoginAccountGuard } from '../guards/admin.guard';
import { AccountLoginDto, CreateAdminDto } from '../dtos/admin.dto';
import {
  accountLoginValidator,
  createAccountValidator,
} from '../validators/admin.validator';
import { UseToken, UserTokenDecorator } from 'src/token/decorator/token.decorator';
import { UserTokenDto } from 'src/token/dto/token.dto';
import { ObjectValidationPipe } from 'src/utils/pipe/validation.pipe';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('test-token')
  @UseToken()
  testToken(@UserTokenDecorator() token: UserTokenDto) {
    return { accessToken: token };
  }

  @Post('create-admin')
  @UseGuards(CreateAccountGuard)
  async create(
    @Body(new ObjectValidationPipe(createAccountValidator))
    adminData: CreateAdminDto,
  ) {
    const admin = this.adminService.create(adminData);
    return admin;
  }

  @Post('login-admin')
  @UseGuards(LoginAccountGuard)
  async adminLogin(
    @Body(new ObjectValidationPipe(accountLoginValidator))
    login: AccountLoginDto,
  ) {
    const admin = await this.adminService.login(login);
    const userTokenDto: UserTokenDto = {
      role: admin.role,
      id: admin.id,
      accountStatus: admin.accountStatus,
    };
    const { token, refreshToken } = await this.adminService.generateUserToken(
      userTokenDto,
    );
    return { admin, token, refreshToken };
  }
}
