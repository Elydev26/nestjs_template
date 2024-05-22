import { Prop } from '@nestjs/mongoose';
export class DocumentExpirationSchema {
  @Prop()
  month: number;
  @Prop()
  day: number;
  @Prop()
  year: number;
}
