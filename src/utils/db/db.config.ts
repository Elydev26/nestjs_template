import { SchemaOptions } from '@nestjs/mongoose';

export const dbSchemaOptions: SchemaOptions = {
  id: true,
  versionKey: false,
  timestamps: true,
  autoIndex: true,
  toJSON: {
    virtuals: true,
    transform: (_, ret) => {
      delete ret._id;
      delete ret.password;
      delete ret.salt;
      delete ret.visible;
      delete ret.secret;
      // delete ret.updatedAt;
      delete ret.code;
      return ret;
    },
  },
  toObject: {
    virtuals: true,
    transform: (_, ret) => {
      delete ret._id;
      delete ret.password;
      delete ret.salt;
      delete ret.visible;
      delete ret.secret;
      // delete ret.updatedAt;
      delete ret.code;
      return ret;
    },
  },
};
