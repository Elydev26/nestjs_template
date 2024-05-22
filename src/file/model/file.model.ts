import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FileTypeEnum } from '../enum/file.enum';
import { dbSchemaOptions } from 'src/utils/db/db.config';

export enum ACLEnum {
  PublicRead = 'public-read',
  Private = 'private',
}
@Schema(dbSchemaOptions)
export class File extends mongoose.Document {
  @Prop({
    type: String,
    enum: Object.values(FileTypeEnum),
  })
  FileType: FileTypeEnum;
  @Prop()
  Key: string;

  @Prop()
  Bucket: string;

  @Prop({
    type: String,
    enum: Object.values(ACLEnum),
  })
  ACL: ACLEnum;

  @Prop()
  Location: string;

  @Prop()
  Size: number;

  @Prop()
  Path: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  createdBy: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
