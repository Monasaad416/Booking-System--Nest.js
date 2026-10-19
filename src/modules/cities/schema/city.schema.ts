import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ModelNames } from '../../../common/dataAccess';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
  collection: ModelNames.CITIES,
})
export class City {
  @Prop({ required: true })
  name!: string;

  @Prop({
    type: Types.ObjectId,
    ref: ModelNames.COUNTRIES,
    required: true,
  })
  countryId!: Types.ObjectId;

  @Prop({ default: false })
  isDeleted?: boolean;

  @Prop({ default: null })
  deletedAt?: Date;
}
export const CitySchema = SchemaFactory.createForClass(City);
