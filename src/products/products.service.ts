import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async create(createProductDto: CreateProductDto, files?: Express.Multer.File[]) {
    const { categoryId, image, ...rest } = createProductDto;

    // Upload images to Supabase and get URLs
    const imageData = [];
    if (files && files.length > 0) {
      for (const file of files) {
        const publicUrl = await this.supabaseService.uploadImage(file);
        imageData.push({ imageUrl: publicUrl });
      }
    }

    return this.prisma.product.create({
      data: {
        name: rest.name,
        price: rest.price,
        description: rest.description,
        stock: rest.stock ?? 0,
        category: {
          connect: { id: categoryId },
        },
        images: {
          create: imageData,
        },
      },
      include: {
        category: true,
        images: true,
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
          images: true,
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
      include: {
        category: true,
        images: true,
      },
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

    await this.findOne(id);

    // Kalau ada file baru, hapus gambar lama dan ganti dengan yang baru
    if (files && files.length > 0) {
      await this.prisma.productImage.deleteMany({
        where: { productId: id },
      });
    }

    const imageData = [];
    if (files && files.length > 0) {
      for (const file of files) {
        const publicUrl = await this.supabaseService.uploadImage(file);
        imageData.push({ imageUrl: publicUrl });
      }
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        ...(rest.name && { name: rest.name }),
        ...(rest.price !== undefined && { price: rest.price }),
        ...(rest.description !== undefined && { description: rest.description }),
        ...(rest.stock !== undefined && { stock: rest.stock }),
        ...(categoryId && {
          category: {
            connect: { id: categoryId },
          },
        }),
        ...(imageData.length > 0 && {
          images: {
            create: imageData,
          },
        }),
      },
      include: {
        category: true,
        images: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    // Hapus gambar terkait dulu (Cascade seharusnya handle, tapi ini lebih aman)
    await this.prisma.productImage.deleteMany({
      where: { productId: id },
    });

    return this.prisma.product.delete({
      where: { id },
    });
  }
}