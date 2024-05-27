import { Logger, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigAPIModule } from 'src/config/config.module';
import { envConfigValidator } from 'src/config/config.validator';
import { EnvConfigEnum } from 'src/config/env.enum';
import { TokenModule } from 'src/token/token.module';
import { UserModule } from 'src/user/user.module';
import { DeserializeAuthorizationToken } from 'src/utils/middlewares/token.middleware';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';



@Module({
  imports: [
    TokenModule,
    UserModule,
    ConfigAPIModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const connectionString = configService.get<string>(
          EnvConfigEnum.CONNECTION_STRING,
        );
        Logger.debug(`CONNECTION STRING ${connectionString}`);
        return {
          uri: connectionString,
          autoIndex: true,
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      validationSchema: envConfigValidator,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    return consumer
      .apply(DeserializeAuthorizationToken)
      .exclude(
        {
          path: 'auth/refresh-access-token',
          method: RequestMethod.POST,
        },
        {
          path: 'token/status',
          method: RequestMethod.GET,
        },
        {
          path: 'generic-apis/get-statistics',
          method: RequestMethod.GET,
        },
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
