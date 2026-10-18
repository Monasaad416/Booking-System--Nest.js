import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ModelNames } from '../../../common/dataAccess';

@Schema({ timestamps: true, collection: ModelNames.REFRESH_TOKENS })
export class RefreshToken {
  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true, unique: true })
  refreshToken!: string;

  @Prop({ required: true })
  expiresAt!: Date;
}
export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
