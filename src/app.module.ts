import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import * as dotenv from 'dotenv';
import { GalleryModule } from './gallery/gallery.module';
import { ProfileModule } from './profile/profile.module';

dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL, {
      connectionFactory: (connection: Connection) => {
        return connection;
      },
    }),
    GalleryModule,
    ProfileModule,
  ],
})
export class AppModule {}
