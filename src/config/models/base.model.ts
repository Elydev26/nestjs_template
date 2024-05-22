import * as mongoose from 'mongoose';
import { Schema } from '@nestjs/mongoose';
import { dbSchemaOptions } from 'src/utils/db/db.config';

@Schema(dbSchemaOptions)
export class BaseModel extends mongoose.Document {}
