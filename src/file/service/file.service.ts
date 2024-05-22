import { FileTypeEnum } from './../enum/file.enum';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ACLEnum, File } from '../model/file.model';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import * as fs from 'fs';
import {
  DeleteFileDto,
  FileDto,
  FileUploadDto,
  InitializeFileForS3DtoResponse,
} from '../dtos/file.dto';
import * as xlsx from 'xlsx';
import * as path from 'path';
import * as _ from 'lodash';
import * as Https from 'https';
import { ConfigService } from '@nestjs/config';
import { EnvConfigEnum } from 'src/config/env.enum';
import * as sharp from 'sharp';
import * as multer from 'multer';
import { UserTokenDto } from 'src/token/dto/token.dto';
import { BaseService } from 'src/utils/db/db.service';


/** file storage settings */
export const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('./upload'))
      fs.mkdirSync('./upload', {
        mode: '0777',
      });
    cb(null, './upload');
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split('.')[1];
    cb(null, `${new Date().getTime()}.${extension}`);
  },
});

@Injectable()
export class FileService extends BaseService<File, ''> {
  private readonly bucket: string;
  private readonly s3Prefix: string;

  constructor(
    @InjectModel(File.name) private fileModel: Model<File>,
    @InjectAwsService(S3) private s3: S3,
    private readonly configService: ConfigService,
  ) {
    super(fileModel);
    this.bucket = this.configService.get<string>(EnvConfigEnum.APP_AWS_BUCKET);
    this.s3Prefix = 'https://s3.amazonaws.com';
  }

  checkFileSize(file: Express.Multer.File) {
    const hundredMb = 100 * 1024 * 1024;
    if (file.size > hundredMb) {
      throw new ConflictException(
        'file size too large, please upload a file less than 100mb',
      );
    }
  }

  async resizeImage(
    path: string | Buffer,
    width: number,
    height: number,
    quality: number,
    format: 'webp' | 'jpeg' | 'png' | 'gif',
    exportType: 'file' | 'buffer' = 'file',
  ) {
    /**
    1. check the resolution of the image
    2. 
     */
    try {
      let localPath = null;
      if (typeof path === 'string') {
        const name = path.split('.')[0];
        localPath = `${name}-${width}x${height}.${format}`;
      }
      /** */
      const processing = sharp(path, { failOnError: true }).resize(
        width,
        height,
        {
          fit: 'cover',
        },
      );
      /** determin the format  */
      switch (format) {
        case 'webp':
          processing.webp({ quality });
          break;
        case 'png':
          processing.png({ quality });
          break;
        case 'jpeg':
          processing.jpeg({ quality });
          break;
        case 'gif':
          processing.jpeg({ quality });
          break;
        default:
          processing.jpeg({ quality });
      }

      if (exportType === 'buffer') return await processing.toBuffer();

      await processing.toFile(localPath);
      return localPath;
    } catch (e) {
      Logger.log(e.message);
      throw new BadRequestException('error resizing image');
    }
  }

  getBucket() {
    return this.bucket;
  }

  getS3Prefix() {
    return this.s3Prefix;
  }

  getFileStat(file: string) {
    return new Promise((resolve, reject) => {
      fs.stat(file, (err, stats) => {
        if (err) {
          reject(new BadRequestException('error getting file state'));
        }
        resolve(stats);
      });
    }) as Promise<fs.Stats>;
  }

  getFileType(file: Express.Multer.File) {
    // TODO: consider looking at other possible types and add them here
    const mimeType = file.mimetype.split('/')[0];
    //
    const imageFileTypes = ['image'];
    const documentFileType = ['application', 'text'];
    const videoFileType = ['video'];
    const audioFileType = ['audio'];
    //
    if (file.mimetype === FileTypeEnum.Svg) {
      return FileTypeEnum.Svg;
    } else if (imageFileTypes.includes(mimeType)) {
      return FileTypeEnum.Image;
    } else if (documentFileType.includes(mimeType)) {
      return FileTypeEnum.Document;
    } else if (videoFileType.includes(mimeType)) {
      return FileTypeEnum.Video;
    } else if (audioFileType.includes(mimeType)) {
      return FileTypeEnum.Audio;
    }
  }

  excelToJson(file: Express.Multer.File, allowedExtensions: string[]) {
    const extension = path.extname(file.originalname);
    if (!allowedExtensions.includes(extension))
      throw new ConflictException('file type not supported ');

    const workbook = xlsx.readFile(file.path);
    const sheetOne = workbook.Sheets[workbook.SheetNames[0]];
    const sheetData = xlsx.utils
      .sheet_to_json(sheetOne, { raw: false })
      .map((row) => _.mapKeys(row, (_, key) => key.trim()));
    return { data: sheetData };
  }

  async delete(data: DeleteFileDto) {
    const { fileId } = data;
    const foundFile = await this.fileModel.findById(fileId);
    if (!foundFile) throw new NotFoundException('file to delete not found');

    await this.deleteFileS3(foundFile.Bucket, foundFile.Key);

    return await foundFile.deleteOne();
  }

  /** this does not upload the file, it only gives you the path to the file when it is uploaded */
  initializeFileForS3(
    content: string,
    bucket: string,
    key: string /** the path where the fille will be stored */,
    name: string,
  ): InitializeFileForS3DtoResponse {
    const localFolder = './programatically-created-files/';
    if (fs.existsSync(`${localFolder}${name}`))
      this.deleteFile(`${localFolder}${name}`);
    if (!fs.existsSync(localFolder)) fs.mkdirSync(localFolder);
    fs.writeFileSync(`${localFolder}${name}`, content);
    const s3Path = `${this.s3Prefix}/${bucket}/${key}/${name}`;
    const itemKey = `${key}/${name}`;
    return { localPath: `${localFolder}${name}`, s3Path, key: itemKey };
  }

  async fileUpload(file: Express.Multer.File, Path: string) {
    const filePath = `${Path}/${file.originalname}`;
    const result = await this.s3
      .upload({
        Bucket: this.bucket,
        ACL: ACLEnum.Private,
        Key: filePath,
        Body: fs.createReadStream(file.path),
      })
      .promise();
    return result;
  }

  /** this uploads file directly from path */
  async fileUploadByPath(
    userTokenDto: UserTokenDto,
    file: Express.Multer.File,
    fileName: string,
    Path: string,
    groupId?: string,
  ) {
    const uploadedFile = await this.s3
      .upload({
        Bucket: this.bucket,
        ACL: ACLEnum.PublicRead,
        Key: `Videos/${fileName}`, //videos or images
        Body: fs.createReadStream(Path),
      })
      .promise();

    // delete from local server;
    this.deleteFile(Path);

    const fileDto: FileDto = {
      Bucket: uploadedFile.Bucket,
      ACL: ACLEnum.PublicRead,
      FileType: FileTypeEnum.Video,
      Location: uploadedFile.Location,
      Size: file.size,
      Key: uploadedFile.Key,
      Path: uploadedFile.Key,
      createdBy: userTokenDto.id,
    };
    const savedFile = await this.addFileRecord(fileDto);

    return savedFile;
  }

  async createAndUploadFileByPath(
    file: string,
    type: FileTypeEnum,
    data: FileUploadDto,
  ) {
    const { ACL, Path, createdBy } = data;

    const Key = `${Path}/${file}`;

    const { Location } = await this.s3
      .upload({
        Bucket: this.bucket,
        ACL,
        Key,
        Body: fs.createReadStream(file),
      })
      .promise();

    const { size } = await this.getFileStat(file);

    const model = new this.fileModel({
      ACL,
      Location,
      Bucket: this.bucket,
      FileType: type,
      createdBy,
      Key,
      Size: size,
      Path,
    });
    return model.save();
  }

  async createAndUploadFile(file: Express.Multer.File, data: FileUploadDto) {
    const { ACL, Path, createdBy } = data;

    const key = `${Path}/${file.originalname}`;
    const { Location } = await this.s3
      .upload({
        Bucket: this.bucket,
        ACL,
        Key: key,
        Body: fs.createReadStream(file.path),
      })
      .promise();

    const model = new this.fileModel({
      ACL,
      Location,
      Bucket: this.bucket,
      FileType: this.getFileType(file),
      Size: file.size,
      createdBy,
      Key: key,
      Path,
    });
    return model.save();
  }

  async addManyByBuffer(files: Express.Multer.File[], data: FileUploadDto) {
    const { ACL, Path, createdBy } = data;

    const result: { file: FileDto; path: string }[] = [];
    for (const file of files) {
      const filePath = `${Path}/${file.originalname}`;
      const response = (await this.s3
        .upload({
          Bucket: this.bucket,
          ACL,
          Key: filePath,
          Body: file.buffer,
        })
        .promise()) as unknown as FileDto;
      result.push({
        file: response,
        path: filePath,
      });
    }

    //delete the files on file
    files.map((file) => this.deleteFile(file.path));

    //create the models
    const fileModels = files.map((file, index) => {
      return new this.fileModel({
        Bucket: this.bucket,
        ACL,
        FileType: this.getFileType(file),
        Location: result[index].file.Location,
        Size: file.size,
        createdBy,
        Key: Path,
        Path: result[index].path,
      });
    });
    //save all models at once
    const savedModels = await this.fileModel.insertMany(fileModels);
    return savedModels;
  }

  async addMany(files: Express.Multer.File[], data: FileUploadDto) {
    const { ACL, Path, createdBy } = data;

    const result: { file: FileDto; path: string }[] = [];
    for (const file of files) {
      const filePath = `${Path}/${file.originalname}`;
      const response = (await this.s3
        .upload({
          Bucket: this.bucket,
          ACL,
          Key: filePath,
          Body: fs.createReadStream(file.path),
        })
        .promise()) as unknown as FileDto;

      result.push({
        file: response,
        path: filePath,
      });
    }

    //delete the files on file
    files.map((file) => this.deleteFile(file.path));

    //create the models
    const fileModels = files.map((file, index) => {
      return new this.fileModel({
        Bucket: this.bucket,
        ACL,
        FileType: this.getFileType(file),
        Location: result[index].file.Location,
        Size: file.size,
        createdBy,
        Key: Path,
        Path: result[index].path,
      });
    });
    //save all models at once
    const savedModels = await this.fileModel.insertMany(fileModels);
    return savedModels;
  }
  async uploadToS3FromServer(data: InitializeFileForS3DtoResponse) {
    const result = await this.s3
      .upload({
        Bucket: this.bucket,
        ACL: ACLEnum.Private,
        Key: data.key,
        Body: fs.createReadStream(data.localPath),
      })
      .promise();
    // delete the file from the local server
    this.deleteFile(data.localPath);
    return result;
  }

  async add(file: Express.Multer.File, data: FileUploadDto): Promise<File> {
    const { ACL, Path, createdBy } = data;
    const { name, ext } = path.parse(file.originalname);
    const timeStamp = new Date().getTime();
    const originalFilepath = `${Path}/${name}-${timeStamp}${ext}`;
    const result = await this.s3
      .upload({
        Bucket: this.bucket,
        ACL,
        Key: originalFilepath,
        Body: fs.createReadStream(file.path),
      })
      .promise();

    // delete the file from the local server
    this.deleteFile(file.path);

    const model = await this.addFileRecord({
      Bucket: this.bucket,
      ACL,
      FileType: this.getFileType(file),
      Location: result.Location,
      Size: file.size,
      createdBy,
      Key: Path,
      Path: originalFilepath,
    });

    return model;
  }

  async getSignedUrl(
    Path: string,
    expirationInSeconds = 60 * 5,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      this.s3.getSignedUrl(
        'getObject',
        {
          Bucket: this.bucket,
          Key: Path,
          Expires: expirationInSeconds,
        },
        (err, url) => {
          if (err) reject(new NotFoundException(err));
          resolve(url);
        },
      );
    });
  }

  deleteFile(file: string | Buffer) {
    try {
      Logger.debug(typeof file, 'the type of file to be deleted');

      // return fs.unlinkSync(file);
      if (typeof file === 'string') {
        return fs.unlinkSync(file);
      } else {
        // set the variable to null to trigger gabage collection
        file = null;
      }
    } catch (e) {
      Logger.error(e.message, 'unable to delete file residue');
    }
  }

  /** This deletes the folder and all its content */
  deleteFolder(path: string) {
    return fs.rmSync(path, {
      recursive: true,
    });
  }

  async deleteFileS3(Bucket: string, Key: string) {
    try {
      return await this.s3
        .deleteObject({
          Bucket,
          Key,
        })
        .promise();
    } catch (e) {
      throw new InternalServerErrorException(
        'unable to delete file at this moment please try again later.',
      );
    }
  }

  async downloadImage(url: string, filepath: string) {
    return new Promise((resolve, reject) => {
      Https.get(url, (res) => {
        if (res.statusCode === 200) {
          res
            .pipe(fs.createWriteStream(filepath))
            .on('error', reject)
            .once('close', () => resolve(filepath));
        } else {
          // Consume response data to free up memory
          res.resume();
          reject(
            new Error(`Request Failed With a Status Code: ${res.statusCode}`),
          );
        }
      });
    });
  }

  async uploadImageByLink(
    fileLink: string,
    data: FileUploadDto,
  ): Promise<File> {
    const { ACL, Path, createdBy } = data;
    const fileSize = await (await fs.promises.stat(fileLink)).size;
    const filePath = `${Path}/${createdBy}`;
    const result = await this.s3
      .upload({
        Bucket: this.bucket,
        ACL,
        Key: filePath,
        Body: fs.createReadStream(fileLink),
      })
      .promise();

    // delete the file from the local server
    this.deleteFile(fileLink);

    const model = await this.addFileRecord({
      Bucket: this.bucket,
      ACL,
      FileType: FileTypeEnum.Image,
      Location: result.Location,
      Size: fileSize,
      createdBy,
      Key: Path,
      Path: filePath,
    });

    return model;
  }

  async addFileRecord(file: FileDto): Promise<File> {
    const model = new this.fileModel(file);
    return await model.save();
  }

  async deleteFileAndS3Record(file: File) {
    await this.deleteFileS3(file.Bucket, file.Key);
    return await file.deleteOne();
  }

  async deleteFileById(id: string) {
    const file = await this.fileModel.findById(id);

    if (!file) throw new NotFoundException('file not found');

    try {
      //remove file from s3
      switch (file.FileType) {
        case FileTypeEnum.Image: {
          const { name } = path.parse(file.Path);
          await Promise.all([
            this.deleteFileS3(file.Bucket, `${file.Key}/${name}-200x200.webp`),
            this.deleteFileS3(file.Bucket, `${file.Key}/${name}-600x600.webp`),
            this.deleteFileS3(
              file.Bucket,
              `${file.Key}/${name}-1200x1200.webp`,
            ),
            this.deleteFileS3(file.Bucket, `${file.Path}`),
          ]);
          break;
        }
        default: {
          await this.deleteFileS3(file.Bucket, file.Key);
        }
      }

      //remove file from db
      return await this.fileModel.findByIdAndDelete(id);
    } catch (e) {
      Logger.error(e.message, 'unable to delete file');
      throw new InternalServerErrorException(
        'unable to delete file at this moment please try again later.',
      );
    }
  }

  generateResizedImageName(originalName: string, dimension: number) {
    const { name } = path.parse(originalName);
    const timeStamp = new Date().getTime();
    switch (dimension) {
      case 200:
        return `${name}-${timeStamp}-200x200.webp`;
      case 600:
        return `${name}-${timeStamp}-600x600.webp`;
      case 1200:
        return `${name}-${timeStamp}-1200x1200.webp`;
    }
  }

  generateImageFilepaths(originalName: string, Path: string) {
    const { name, ext } = path.parse(originalName);
    const timeStamp = new Date().getTime();
    const originalFilepath = `${Path}/${name}-${timeStamp}${ext}`;
    const thumbnailFilepath = `${Path}/${this.generateResizedImageName(
      originalName,
      200,
    )}`;
    const mediumFilepath = `${Path}/${this.generateResizedImageName(
      originalName,
      600,
    )}`;
    const largeFilepath = `${Path}/${this.generateResizedImageName(
      originalName,
      1200,
    )}`;
    return {
      originalFilepath,
      thumbnailFilepath,
      mediumFilepath,
      largeFilepath,
    };
  }

  async generateSeveralImageQualities(
    path: string | Buffer,
    exportType: 'file' | 'buffer' = 'file',
  ) {
    return await Promise.all([
      this.resizeImage(path, 600, 600, 90, 'webp', exportType),
      this.resizeImage(path, 200, 200, 90, 'webp', exportType),
      this.resizeImage(path, 1200, 1200, 90, 'webp', exportType),
    ]);
  }
}
