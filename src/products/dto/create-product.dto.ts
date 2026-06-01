import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  MinLength,
  Min,
  IsInt,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Kaos Polos Premium Cotton' })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ example: 150000 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ example: 'Kaos polos bahan katun combed 30s' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  categoryId: number;

  @ApiPropertyOptional({ example: 50 })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  stock?: number;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Upload gambar produk (opsional)',
  })
  @IsOptional()
  image?: any; // Untuk Swagger multipart, sebenarnya dikirim via files[]
}