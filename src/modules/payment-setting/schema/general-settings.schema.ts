import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ModelNames } from '../../../common/dataAccess';

export const PAYMENT_SETTINGS_KEY = 'default';

@Schema({
  timestamps: true,
  collection: ModelNames.PAYMENT_SETTINGS,
})
export class PaymentSettings {
  @Prop({
    required: true,
    unique: true,
    default: PAYMENT_SETTINGS_KEY,
    immutable: true,
  })
  singletonKey!: string;

  @Prop({ required: true, default: 0, min: 0, max: 100 })
  vatRate!: number;

  @Prop({ required: true, default: 0, min: 0, max: 100 })
  guestServiceFeeRate!: number;

  @Prop({ required: true, default: 0, min: 0, max: 100 })
  hostServiceFeeRate!: number;

  @Prop({ required: true, default: 0, min: 0 })
  minimumOrderAmount!: number;

  @Prop({ required: true, default: 100000, min: 0 })
  maximumOrderAmount!: number;
}

export const PaymentSettingsSchema =
  SchemaFactory.createForClass(PaymentSettings);
