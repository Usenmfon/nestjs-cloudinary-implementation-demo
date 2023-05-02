import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile, ProfileDocument } from './schema/profile.schema';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/helper/cloudinary/cloudinary.service';
import { CreateProfileDto, UpdateProfileDto } from './dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private ProfileSchema: Model<ProfileDocument>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async getProfile(id) {
    return this.ProfileSchema.findOne({ _id: id })
      .then(async (user) => {
        if (!user) {
          throw new BadRequestException('Profile not found');
        }
        return user;
      })
      .catch((e) => {
        throw new BadRequestException(e.message);
      });
  }

  async create(dto: CreateProfileDto, file: Express.Multer.File) {
    try {
      const user = await this.ProfileSchema.find({ email: dto.email });
      if (user) {
        throw new BadRequestException('Email already exists');
      }

      if (file) {
        const avatar = await this.cloudinaryService
          .uploadImage(file)
          .catch((e) => {
            throw new BadRequestException(e.message);
          });
        if (avatar) {
          dto.avatar = avatar.url;
          dto.publicId = avatar.public_id;
        }
      }

      const profile = new this.ProfileSchema({ ...dto });
      await profile.save();
      return profile;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id, dto: UpdateProfileDto, file: Express.Multer.File) {
    try {
      const profile = await this.ProfileSchema.findById(id);
      if (profile.avatar) {
        await this.cloudinaryService.deleteImage(profile.publicId);
      }

      if (file) {
        const avatar = await this.cloudinaryService
          .uploadImage(file)
          .catch((e) => {
            throw new BadRequestException(e.message);
          });
        if (avatar) {
          dto.avatar = avatar.url;
          dto.publicId = avatar.public_id;
        }
      }

      return this.ProfileSchema.findByIdAndUpdate({ _id: id }, dto, {
        upsert: true,
        new: true,
      }).then(async (profile) => {
        return profile;
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(id) {
    try {
      const profile = await this.ProfileSchema.findById(id);
      if (!profile) throw new BadRequestException('profile not found');
      if (profile.avatar) {
        await this.cloudinaryService.deleteImage(profile.publicId);
      }

      await profile.deleteOne();
      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
