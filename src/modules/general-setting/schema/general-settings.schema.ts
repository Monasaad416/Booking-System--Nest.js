import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ModelNames } from '../../../common/dataAccess';

export const GENERAL_SETTINGS_KEY = 'default';

@Schema({
  timestamps: true,
  collection: ModelNames.GENERAL_SETTINGS,
})
export class GeneralSettings {
  @Prop({
    required: true,
    default: GENERAL_SETTINGS_KEY,
    immutable: true,
  })
  singletonKey!: string;

  @Prop({ required: true, trim: true })
  appName!: string;

  @Prop({ required: true, uppercase: true, trim: true })
  defaultCurrency!: string;

  @Prop({ required: true, default: 'en', trim: true })
  defaultLanguage!: string;

  @Prop({ type: [String], default: ['en', 'ar'] })
  supportedLanguages!: string[];

  @Prop({ required: true, default: 'UTC' })
  timezone!: string;

  @Prop({ default: false })
  maintenanceMode!: boolean;
}

export const GeneralSettingsSchema =
  SchemaFactory.createForClass(GeneralSettings);

GeneralSettingsSchema.index(
  { singletonKey: 1 },
  {
    unique: true,
    partialFilterExpression: { singletonKey: { $type: 'string' } },
  },
);
