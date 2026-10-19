import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ModelNames } from '../../../common/dataAccess';

@Schema({
  timestamps: true,
  collection: ModelNames.UNIT_CATEGORIES,
})
export class UnitCategory {
  @Prop({ required: true, unique: true, trim: true })
  name!: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({ trim: true })
  image?: string;

  @Prop({ default: true })
  isActive!: boolean;

  @Prop({ type: Date, default: null })
  archivedAt?: Date | null;
}
export const UnitCategorySchema = SchemaFactory.createForClass(UnitCategory);
