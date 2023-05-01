import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateGalleryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  images?: {
    url: string;
    publicId: string;
  }[];
}
