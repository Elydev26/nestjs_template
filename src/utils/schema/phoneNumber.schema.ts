import { Prop } from '@nestjs/mongoose';
import { PhoneCountryCodeEnum } from '../enum/phoneCountryCodes.enum';
import { ApiProperty } from '@nestjs/swagger';

export class PhoneNumberSchema {
  @ApiProperty({ enum: PhoneCountryCodeEnum })
  @Prop({ type: String, enum: Object.values(PhoneCountryCodeEnum) })
  code: PhoneCountryCodeEnum;
  @ApiProperty()
  @Prop()
  number: string;
  @ApiProperty()
  @Prop()
  local: string;
}
