import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(
    dto: CreateProductDto,
    files: Express.Multer.File[],
  ) {
    const { categoryId, image, ...rest } = dto;

    return this.prisma.product.create({
      data: {
        ...rest,

        category: {
          connect: { id: categoryId },
        },

        images: {
          create: files.map(
            (file) => ({
              imageUrl:
                `/uploads/products/${file.filename}`,
            }),
          ),
        },
      },

      include: {
        category: true,
        images: true,
      },
    });
  }

  async findAll(
    page = 1,
    limit = 10,
    search?: string,
  ) {
    const skip =
      (page - 1) * limit;

    const where = search
      ? {
          name: {
            contains: search,
          },
        }
      : {};

    const data =
      await this.prisma.product.findMany({
        skip,
        take: limit,

        where,

        include: {
          category: true,
          images: true,
        },

        orderBy: {
          createdAt: 'desc',
        },
      });

    const total =
      await this.prisma.product.count({
        where,
      });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(
        total / limit,
      ),
    };
  }

  async findOne(id: number) {
    const product =
      await this.prisma.product.findUnique({
        where: { id },

        include: {
          category: true,
          images: true,
        },
      });

    if (!product) {
      throw new NotFoundException(
        'Product not found',
      );
    }

    return product;
  }

  async update(
    id: number,
    dto: UpdateProductDto,
    files: Express.Multer.File[],
  ) {
    await this.findOne(id);

    await this.prisma.product.update({
      where: { id },

      data: {
        ...dto,
      },
    });

    if (
      files &&
      files.length
    ) {
      await this.prisma.productImage.createMany({
        data: files.map(
          (file) => ({
            productId: id,
            imageUrl:
              `/uploads/products/${file.filename}`,
          }),
        ),
      });
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.product.delete({
      where: { id },
    });
  }
}