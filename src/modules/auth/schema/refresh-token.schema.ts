import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class RefreshToken {
  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true, unique: true })
  refreshToken!: string;

  @Prop({ required: true })
  expiresAt!: Date;
}
export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
