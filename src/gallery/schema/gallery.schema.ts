import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Gallery {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  avatar: string;

  @Prop({ type: String })
  avatarId: string;

  @Prop({ type: Array })
  pictures: [
    {
      url: string;
      publicId: string;
    },
  ];
}

export type GalleryDocument = HydratedDocument<Gallery>;
export const GallerySchema = SchemaFactory.createForClass(Gallery);
