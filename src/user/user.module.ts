import {  Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { User, UserModel } from './models/user.model';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

@Global()
@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [
    JwtModule,
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          return UserModel;
        },
      },
    ]),
  ],
})
export class UserModule {}
