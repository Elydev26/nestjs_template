import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { S3 } from 'aws-sdk';
import { AwsSdkModule } from 'nest-aws-sdk';
import { EnvConfigEnum } from 'src/config/env.enum';
import { FileController } from './controllers/file.controller';
import { FileSchema, File } from './model/file.model';
import { FileService } from './service/file.service';

@Global()
@Module({
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService, AwsSdkModule],
  imports: [
    //   import the module you want to use
    AwsSdkModule.forFeatures([S3]),
    // global configuration
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        useFactory: (config: ConfigService) => {
          const region = config.get<string>(EnvConfigEnum.APP_AWS_REGION);
          const accessKeyId = config.get<string>(
            EnvConfigEnum.APP_AWS_ACCESS_KEY_ID,
          );
          const secretAccessKey = config.get<string>(
            EnvConfigEnum.APP_AWS_SECRET_ACCESS_KEY,
          );
          return {
            region,
            credentials: {
              secretAccessKey,
              accessKeyId,
            },
          };
        },
        inject: [ConfigService],
      },
    }),
    MongooseModule.forFeatureAsync([
      {
        name: File.name,
        useFactory: () => {
          return FileSchema;
        },
      },
    ]),
  ],
})
export class FileModule {}
