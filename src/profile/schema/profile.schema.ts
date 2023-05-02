import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { isEmail } from 'class-validator';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Profile {
  @Prop({ type: String })
  name: string;

  @Prop({
    type: String,
    validate: [
      {
        validator: isEmail,
        message: () => console.log('please enter a valid email'),
      },
    ],
  })
  email: string;

  @Prop({ type: String })
  avatar: string;

  @Prop({ type: String })
  publicId: string;
}

export type ProfileDocument = HydratedDocument<Profile>;
export const ProfileSchema = SchemaFactory.createForClass(Profile);
