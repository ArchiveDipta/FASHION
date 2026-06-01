import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  MinLength,
  Min,
  IsInt,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Kaos Polos Premium Cotton',
    description: 'Nama produk',
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    example: 150000,
    description: 'Harga produk dalam Rupiah',
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({
    example: 'Kaos polos bahan katun combed 30s, nyaman dipakai sehari-hari',
    description: 'Deskripsi produk (opsional)',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 1,
    description: 'ID kategori yang terkait dengan produk ini',
  })
  @IsInt()
  @Min(1)
  categoryId: number;

  @ApiPropertyOptional({
    example: 50,
    description: 'Jumlah stok produk yang tersedia',
    default: 0,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  stock?: number;

  @ApiPropertyOptional({
    example: 'uploads/products/kaos-polos.jpg',
    description: 'Path atau URL gambar produk (opsional)',
  })
  @IsString()
  @IsOptional()
  image?: string;
}