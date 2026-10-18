import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ModelNames } from '../../../common/dataAccess';

@Schema({
  timestamps: true,
  collection: ModelNames.COUNTRIES,
})
export class Country {
  @Prop({ required: true })
  name!: string;

  @Prop({ unique: true, sparse: true })
  code?: string;

  @Prop({ default: false })
  isDeleted?: boolean;

  @Prop({ default: null })
  deletedAt?: Date;
}
export const CountrySchema = SchemaFactory.createForClass(Country);
