import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ModelNames } from '../../../common/dataAccess';

export const BOOKING_SETTINGS_KEY = 'default';

@Schema({
  timestamps: true,
  collection: ModelNames.BOOKING_SETTINGS,
})
export class BookingSettings {
  @Prop({
    required: true,
    unique: true,
    default: BOOKING_SETTINGS_KEY,
    immutable: true,
  })
  singletonKey!: string;

  @Prop({ required: true, default: 1, min: 1 })
  minimumBookingNights!: number;

  @Prop({ required: true, default: 90, min: 1 })
  maximumBookingNights!: number;

  @Prop({ required: true, default: 24, min: 0 })
  minimumAdvanceBookingHours!: number;

  @Prop({ required: true, default: 365, min: 1 })
  maximumAdvanceBookingDays!: number;

  @Prop({ required: true, default: 10, min: 1 })
  maximumGuestsPerBooking!: number;
}

export const BookingSettingsSchema =
  SchemaFactory.createForClass(BookingSettings);
