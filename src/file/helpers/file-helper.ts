import {
  applyDecorators,
  BadRequestException,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

export const imageFileFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new BadRequestException('Only Image Files Allowed'), false);
  }
  callback(null, true);
};
export const FileUpload = () => {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: (req, file, cb) => {
            const uploadPath = 'upload/files/';
            // Create folder if it doesn't exist
            if (!existsSync(uploadPath)) {
              mkdirSync(uploadPath);
            }
            cb(null, uploadPath);
          },
          filename: (req, file, cb) => {
            const extension = extname(file.originalname);
            cb(null, `${uuid()}${Date.now()}${extension}`);
          },
        }),
        fileFilter: imageFileFilter,
      }),
    ),
  );
};
