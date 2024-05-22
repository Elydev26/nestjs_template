import { FileTypeEnum, ACLEnum } from '../enum/file.enum';
import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDto {
  @ApiProperty()
  Path: string;

  @ApiProperty({ enum: FileTypeEnum })
  ACL: ACLEnum;

  @ApiProperty()
  createdBy: string;
}

export class DeleteFileDto {
  @ApiProperty()
  fileId: string;
}

export class FileDto {
  id?: string;

  @ApiProperty()
  Bucket: string;

  @ApiProperty({ enum: ACLEnum })
  ACL: ACLEnum;

  @ApiProperty({ enum: FileTypeEnum })
  FileType: FileTypeEnum;

  @ApiProperty()
  Location: string;

  @ApiProperty()
  Size: number;

  @ApiProperty()
  Key: string;

  @ApiProperty()
  Path: string;

  @ApiProperty()
  createdBy: string;

  @ApiProperty({ required: false })
  original?: string;
}

export class InitializeFileForS3DtoResponse {
  @ApiProperty()
  localPath: string;
  @ApiProperty()
  s3Path: string;
  @ApiProperty()
  key: string;
}
