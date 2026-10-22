import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ModelNames } from '../../../common/dataAccess';

export const CANCELLATION_SETTINGS_KEY = 'default';

@Schema({
  timestamps: true,
  collection: ModelNames.CANCELLATION_SETTINGS,
})
export class CancellationSettings {
  @Prop({
    required: true,
    unique: true,
    default: CANCELLATION_SETTINGS_KEY,
    immutable: true,
  })
  singletonKey!: string;

  @Prop({ required: true, default: true })
  cancellationAllowed!: boolean;

  @Prop({ required: true, default: 48, min: 0 })
  freeCancellationHours!: number;

  @Prop({ required: true, default: 0, min: 0, max: 100 })
  cancellationFeeRate!: number;

  @Prop({ required: true, default: 7, min: 0 })
  refundProcessingDays!: number;
}

export const CancellationSettingsSchema =
  SchemaFactory.createForClass(CancellationSettings);
