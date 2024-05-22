import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { dbSchemaOptions } from 'src/utils/db/db.config';
import { AccountStatusEnum } from 'src/utils/enum/accountStatus.enum';
import { RoleTypeEnum } from 'src/utils/enum/role.enum';
import { PhoneNumberSchema } from 'src/utils/schema/phoneNumber.schema';

@Schema(dbSchemaOptions)
export class Admin {
  id?: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  userName: string;

  @Prop({
    enum: Object.values(AccountStatusEnum),
    type: String,
  })
  accountStatus: AccountStatusEnum;

  @Prop({
    enum: Object.values(RoleTypeEnum),
    type: String,
  })
  role: RoleTypeEnum;

  @Prop({ type: PhoneNumberSchema })
  phoneNumber: PhoneNumberSchema;

  @Prop()
  refreshToken: string;
}

export type AdminDocument = Admin & mongoose.Document;
export const AdminModel = SchemaFactory.createForClass(Admin);
