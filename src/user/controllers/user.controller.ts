import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { CreateAccountGuard, LoginAccountGuard } from '../guards/user.guard';
import { AccountLoginDto, CreateAdminDto } from '../dtos/user.dto';
import {
  accountLoginValidator,
  createAccountValidator,
} from '../validators/user.validator';
import { UseToken, UserTokenDecorator } from 'src/token/decorator/token.decorator';
import { UserTokenDto } from 'src/token/dto/token.dto';
import { ObjectValidationPipe } from 'src/utils/pipe/validation.pipe';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test-token')
  @UseToken()
  testToken(@UserTokenDecorator() token: UserTokenDto) {
    return { accessToken: token };
  }

  @Post('create')
  @UseGuards(CreateAccountGuard)
  async create(
    @Body(new ObjectValidationPipe(createAccountValidator))
    adminData: CreateAdminDto,
  ) {
    const user = this.userService.create(adminData);
    return user;
  }

  @Post('login')
  @UseGuards(LoginAccountGuard)
  async adminLogin(
    @Body(new ObjectValidationPipe(accountLoginValidator))
    login: AccountLoginDto,
  ) {
    const user = await this.userService.login(login);
    const userTokenDto: UserTokenDto = {
      role: user.role,
      id: user.id,
      accountStatus: user.accountStatus,
    };
    const { token, refreshToken } = await this.userService.generateUserToken(
      userTokenDto,
    );
    return { user, token, refreshToken };
  }
}
