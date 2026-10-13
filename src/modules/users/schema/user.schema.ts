import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true, unique: true })
  phoneNumber!: string;

  @Prop({ required: true, minlength: 8 })
  password!: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
