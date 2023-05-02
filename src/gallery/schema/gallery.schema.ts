import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Gallery {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Array })
  images: [];
}

export type GalleryDocument = HydratedDocument<Gallery>;
export const GallerySchema = SchemaFactory.createForClass(Gallery);
