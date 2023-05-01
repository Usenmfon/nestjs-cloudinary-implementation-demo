import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Types } from 'mongoose';

@Controller('gallery')
export class GalleryController {
  constructor(private galleryService: GalleryService) {}

  @Get()
  async getGalleries() {
    return this.galleryService.getAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('images'))
  async createGallery(
    @Body() dto: CreateGalleryDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.galleryService.create(dto, files);
  }

  @Delete(':id')
  async deleteGallery(@Param() params: Types.ObjectId) {
    return this.galleryService.delete(params.id);
  }
}
