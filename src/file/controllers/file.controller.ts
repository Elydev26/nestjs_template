import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  Query,
  NotFoundException,
  Logger,
  BadRequestException,
  Req,
  Param,
  Delete,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from '../dtos/file.dto';
import { FileUpload, imageFileFilter } from '../helpers/file-helper';
import { FileService } from '../service/file.service';
import { fileValidator } from '../validator/file.validator';
import { ApiTags } from '@nestjs/swagger';
import { ACLEnum } from '../enum/file.enum';
import { UseToken, UserTokenDecorator } from 'src/token/decorator/token.decorator';
import { UserTokenDto } from 'src/token/dto/token.dto';
import { ObjectValidationPipe } from 'src/utils/pipe/validation.pipe';

@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('file-info')
  @FileUpload()
  fileInfo(@Req() req, @UploadedFile() file: Express.Multer.File) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }

    if (!file) throw new NotFoundException('please upload a file');
    // return this.fileService.getFileType(file);
    return file;
  }
  @Post('test-upload')
  @FileUpload()
  testUpload(@Req() req, @UploadedFile() file: Express.Multer.File) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }

    if (!file) throw new NotFoundException('please upload a file');
    return this.fileService.fileUpload(file, 'testing');
  }

  @Post('add')
  @FileUpload()
  add(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Body(new ObjectValidationPipe(fileValidator)) data: FileUploadDto,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }

    if (!file) throw new NotFoundException('please upload a file');

    Logger.log('File uploaded', file.filename, { data });
    return this.fileService.add(file, data);
  }

  @Post('upload-document')
  @UseToken()
  @UseInterceptors(FileInterceptor('file', { dest: './upload' }))
  async uploadDocuments(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @UserTokenDecorator() tokenData: UserTokenDto,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    const result = await this.fileService.add(file, {
      ACL: ACLEnum.PublicRead,
      Path: 'documents',
      createdBy: tokenData.id,
    });

    return result;
  }

  @Get('signed-url/')
  getSignedUrl(@Query('path') Path: string) {
    return this.fileService.getSignedUrl(Path);
  }

  @Get('to-enum')
  strEnum<T extends string>(@Body('items') o: Array<T>): { [K in T]: K } {
    return o.reduce((res, key) => {
      res[key] = key;
      return res;
    }, Object.create(null));
  }

  @Post('multiple-file-upload')
  @UseInterceptors(
    FilesInterceptor('files[]', 20, {
      fileFilter: imageFileFilter,
    }),
  )
  multipleFileUpload(@Req() req, @UploadedFiles() files) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!files) throw new NotFoundException('please upload a file');
    return this.fileService.fileUpload(files, 'testing');
  }
}
