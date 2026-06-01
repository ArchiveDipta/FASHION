import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'T-Shirts',
    description: 'Nama kategori produk',
  })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiPropertyOptional({
    example: 'Koleksi kaos casual untuk pria dan wanita',
    description: 'Deskripsi kategori (opsional)',
  })
  @IsString()
  @IsOptional()
  description?: string;
}