import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGalleryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  images?: {
    url: string;
    publicId: string;
  }[];
}
