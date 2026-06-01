import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto, files?: Express.Multer.File[]) {
    const { categoryId, image, ...rest } = createProductDto;

    // Handle uploaded files if any
    const imageUrls = files?.map((file) => `/uploads/${file.filename}`) || [];
    const mainImage = imageUrls[0] || image || null;

    return this.prisma.product.create({
      data: {
        name: rest.name,
        price: rest.price,
        description: rest.description,
        stock: rest.stock ?? 0, // ✅ Fix: default 0 kalau undefined
        image: mainImage,
        category: {
          connect: { id: categoryId },
        },
      },
      include: {
        category: true,
      },
    });
  }

  async findAll(page?: number, limit?: number, search?: string) {
    const where = search
      ? {
          name: {
            contains: search,
            mode: 'insensitive' as const,
          },
        }
      : {};

    const skip = page && limit ? (page - 1) * limit : undefined;
    const take = limit || undefined;

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take,
        include: {
          category: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page: page || 1,
        limit: limit || total,
        totalPages: limit ? Math.ceil(total / limit) : 1,
      },
    };
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    files?: Express.Multer.File[],
  ) {
    const { categoryId, image, ...rest } = updateProductDto;

    // Check product exists
    await this.findOne(id);

    // Handle uploaded files if any
    const imageUrls = files?.map((file) => `/uploads/${file.filename}`) || [];
    const mainImage = imageUrls[0] || image || undefined;

    return this.prisma.product.update({
      where: { id },
      data: {
        ...(rest.name && { name: rest.name }),
        ...(rest.price !== undefined && { price: rest.price }),
        ...(rest.description !== undefined && { description: rest.description }),
        ...(rest.stock !== undefined && { stock: rest.stock }),
        ...(mainImage && { image: mainImage }),
        ...(categoryId && {
          category: {
            connect: { id: categoryId },
          },
        }),
      },
      include: {
        category: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.product.delete({
      where: { id },
    });
  }
}