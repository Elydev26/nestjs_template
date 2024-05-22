import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class AddressSchema {
  @Prop()
  @ApiProperty()
  country: string;

  @Prop()
  @ApiProperty()
  address?: string;

  @Prop()
  @ApiProperty()
  city: string;

  @Prop()
  @ApiProperty()
  state: string;

  @Prop()
  @ApiProperty()
  zip: string;

  @Prop({ default: 'Point' })
  @ApiProperty()
  type: string;

  @Prop({ type: [Number] })
  @ApiProperty()
  coordinates?: [number, number]; // [lon, lat]
}
