import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ModelNames } from '../../../common/dataAccess';

export const NOTIFICATION_SETTINGS_KEY = 'default';

@Schema({
  timestamps: true,
  collection: ModelNames.NOTIFICATION_SETTINGS,
})
export class NotificationSettings {
  @Prop({
    required: true,
    unique: true,
    default: NOTIFICATION_SETTINGS_KEY,
    immutable: true,
  })
  singletonKey!: string;

  @Prop({ required: true, default: true })
  emailNotificationsEnabled!: boolean;

  @Prop({ required: true, default: true })
  bookingConfirmationEnabled!: boolean;

  @Prop({ required: true, default: true })
  bookingCancellationEnabled!: boolean;

  @Prop({ required: true, default: true })
  paymentConfirmationEnabled!: boolean;

  @Prop({ required: true, default: true })
  refundNotificationEnabled!: boolean;
}

export const NotificationSettingsSchema =
  SchemaFactory.createForClass(NotificationSettings);
