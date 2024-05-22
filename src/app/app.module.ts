import { Module } from '@nestjs/common';
import { AppController } from './app/controllers/app.controller';
import { AppService } from './app/services/app.service';
import { ConfigModule } from './config/config.module';
import { TokenModule } from './token/token.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [ConfigModule, TokenModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
