import { CacheModule, Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AdminController } from './controllers/admin.controller';
import { Admin, AdminModel } from './models/admin.model';
import { AdminService } from './services/admin.service';

@Global()
@Module({
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
  imports: [
    CacheModule.register(),
    JwtModule,
    MongooseModule.forFeatureAsync([
      {
        name: Admin.name,
        useFactory: () => {
          return AdminModel;
        },
      },
    ]),
  ],
})
export class AdminModule {}
