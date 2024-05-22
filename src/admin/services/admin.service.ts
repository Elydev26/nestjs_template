import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EnvConfigEnum } from 'src/config/env.enum';
import { AccountLoginDto, CreateAdminDto } from '../dtos/admin.dto';
import { Admin, AdminDocument } from '../models/admin.model'
import { hashPassword, verifyPassword } from 'src/general/function/password.function';
import { UserTokenDto } from 'src/token/dto/token.dto';
import { TokenService } from 'src/token/service/token.service';
import { AccountStatusEnum } from 'src/utils/enum/accountStatus.enum';
import { RoleTypeEnum } from 'src/utils/enum/role.enum';
import { BaseService } from 'src/utils/db/db.service';

@Injectable()
export class AdminService extends BaseService<AdminDocument, ''> {
  constructor(
    @InjectModel(Admin.name)
    private adminModel: Model<AdminDocument>,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {
    super(adminModel);
  }

  async create(data: CreateAdminDto) {
    /**hash password*/
    const password = await hashPassword(data.password);
    const account = new this.adminModel({
      ...data,
      role: RoleTypeEnum.Admin,
      password,
      accountStatus: AccountStatusEnum.Inactive,
    });
    await account.save();
    return account;
  }

  async generateUserToken(data: UserTokenDto) {
    const token = await this.tokenService.tokenize({
      data: { id: data.id, role: data.role },
      expiresIn: this.configService.get(EnvConfigEnum.TOKEN_EXPIRATION_TIME),
    });
    const refreshToken = await this.tokenService.refreshToken({
      id: data.id,
      expiresIn: this.configService.get(
        EnvConfigEnum.REFRESH_TOKEN_EXPIRATION_TIME,
      ),
    });
    return {
      token,
      refreshToken,
    };
  }

  async login(admin: AccountLoginDto) {
    const { userName, password } = admin;
    const user = await this.adminModel.findOne({ userName });
    if (!user) {
      throw new UnauthorizedException('invalid userName or password');
    }
    const isPasswordMatch = await verifyPassword(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('invalid userName or password');
    }
    return user;
  }

  async findUser(email: string) {
    const account = await this.adminModel
      .findOne({ email: email })
      .populate('profilePicture');
    return account;
  }

  async findUserAndDelete(email: string) {
    await this.adminModel.findOneAndDelete({ email: email });
    return 'success';
  }

  async findUserById(id: string) {
    const account = await this.adminModel.findById(id);
    return account;
  }

  updateRefreshToken(id: string, refreshToken: string) {
    return this.adminModel.findByIdAndUpdate(id, { refreshToken });
  }
}
