import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto, files?: Express.Multer.File[]): Promise<{
        category: {
            name: string;
            id: number;
            slug: string;
        };
        images: {
            id: number;
            imageUrl: string;
            productId: number;
        }[];
    } & {
        description: string | null;
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        categoryId: number;
        stock: number;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(page?: number, limit?: number, search?: string): Promise<{
        data: ({
            category: {
                name: string;
                id: number;
                slug: string;
            };
            images: {
                id: number;
                imageUrl: string;
                productId: number;
            }[];
        } & {
            description: string | null;
            name: string;
            price: import("@prisma/client/runtime/library").Decimal;
            categoryId: number;
            stock: number;
            id: number;
            createdAt: Date;
            updatedAt: Date;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<{
        category: {
            name: string;
            id: number;
            slug: string;
        };
        images: {
            id: number;
            imageUrl: string;
            productId: number;
        }[];
    } & {
        description: string | null;
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        categoryId: number;
        stock: number;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateProductDto: UpdateProductDto, files?: Express.Multer.File[]): Promise<{
        category: {
            name: string;
            id: number;
            slug: string;
        };
        images: {
            id: number;
            imageUrl: string;
            productId: number;
        }[];
    } & {
        description: string | null;
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        categoryId: number;
        stock: number;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        description: string | null;
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        categoryId: number;
        stock: number;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
