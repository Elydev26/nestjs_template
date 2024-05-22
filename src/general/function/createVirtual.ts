import { VirtualsDto } from '../../dto/virtuals.dto';

export const createVirtual = (data: VirtualsDto) => {
  const { ref, schema, foreignField, populationName, localField, justOne } =
    data;

  return schema.virtual(populationName, {
    ref,
    localField,
    foreignField,
    justOne,
  });
};
