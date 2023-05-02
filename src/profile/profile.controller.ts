import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Types } from 'mongoose';
import { CreateProfileDto, UpdateProfileDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get(':id')
  async getProfile(@Param() params: Types.ObjectId) {
    return this.profileService.getProfile(params.id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  async createProfile(
    @Body() dto: CreateProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.profileService.create(dto, file);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateProfile(
    @Param() params: Types.ObjectId,
    @Body() dto: UpdateProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.profileService.update(params.id, dto, file);
  }

  @Delete(':id')
  async deleteProfile(@Param() params: Types.ObjectId) {
    return this.profileService.delete(params.id);
  }
}
