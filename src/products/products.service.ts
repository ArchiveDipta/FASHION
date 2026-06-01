import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  
  // 1. CONSTRUCTOR (tetap seperti biasa)
  constructor(private readonly prisma: PrismaService) {}

  // 2. CREATE() ← Taruh DI SINI, setelah constructor
  async create(createProductDto: CreateProductDto) {
    const { categoryId, image, ...productData } = createProductDto;

    return this.prisma.product.create({
      data: {
        ...productData,
        category: {
          connect: { id: categoryId },
        },
      },
      include: {
        category: true,
      },
    });
  }

  // 3. FINDALL() ← Setelah create()
  async findAll() {
    return this.prisma.product.findMany({
      include: { category: true },
    });
  }

  // 4. FINDONE() ← Setelah findAll()
  async findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  // 5. UPDATE() ← Setelah findOne()
  async update(id: number, updateProductDto: UpdateProductDto) {
    const { categoryId, image, ...productData } = updateProductDto;

    return this.prisma.product.update({
      where: { id },
      data: {
        ...productData,
        ...(categoryId && {
          category: {
            connect: { id: categoryId },
          },
        }),
      },
      include: { category: true },
    });
  }

  // 6. REMOVE() ← Paling bawah
  async remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }

} // ← Tutup class