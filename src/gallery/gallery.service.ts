import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGalleryDto } from './dto';
import { Gallery, GalleryDocument } from './schema/gallery.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/helper/cloudinary/cloudinary.service';

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel(Gallery.name) private GallerySchema: Model<GalleryDocument>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async getAll() {
    try {
      return this.GallerySchema.find().sort({ createdAt: -1 });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async create(
    dto: CreateGalleryDto,
    files?: Express.Multer.File[],
  ): Promise<GalleryDocument> {
    try {
      if (files) {
        const images = await this.cloudinaryService
          .uploadImages(files)
          .catch((e) => {
            throw new BadRequestException(e.message);
          });
        if (images) {
          dto.images = images.map((img) => {
            return { url: img.url, publicId: img.public_id };
          });
        }
      }

      const gallery = new this.GallerySchema({ ...dto });
      await gallery.save();
      return gallery;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async delete(id) {
    try {
      const gallery = await this.GallerySchema.findById(id);
      if (!gallery) throw new BadRequestException('Gallery not found');

      if (gallery.images) {
        await this.cloudinaryService.deleteImages(gallery.images);
      }

      await gallery.deleteOne();
      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
