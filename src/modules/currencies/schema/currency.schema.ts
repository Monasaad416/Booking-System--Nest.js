import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ModelNames } from '../../../common/dataAccess';

@Schema({
  timestamps: true,
  collection: ModelNames.CURRENCIES,
})
export class Currency {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true, uppercase: true, trim: true })
  code!: string;

  @Prop({ required: true, unique: true, trim: true })
  symbol!: string;

  @Prop({ default: true })
  isActive!: boolean;

  @Prop({ type: Date, default: null })
  archivedAt?: Date | null;
}
export const CurrencySchema = SchemaFactory.createForClass(Currency);
