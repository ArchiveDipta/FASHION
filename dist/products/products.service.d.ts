import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SupabaseService } from '../supabase/supabase.service';
export declare class ProductsService {
    private readonly prisma;
    private readonly supabaseService;
    constructor(prisma: PrismaService, supabaseService: SupabaseService);
    create(createProductDto: CreateProductDto, files?: Express.Multer.File[]): Promise<{
        category: {
            id: number;
            name: string;
            slug: string;
        };
        images: {
            id: number;
            imageUrl: string;
            productId: number;
        }[];
    } & {
        id: number;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        categoryId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(page?: number, limit?: number, search?: string): Promise<{
        data: ({
            category: {
                id: number;
                name: string;
                slug: string;
            };
            images: {
                id: number;
                imageUrl: string;
                productId: number;
            }[];
        } & {
            id: number;
            name: string;
            description: string | null;
            price: import("@prisma/client/runtime/library").Decimal;
            stock: number;
            categoryId: number;
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
            id: number;
            name: string;
            slug: string;
        };
        images: {
            id: number;
            imageUrl: string;
            productId: number;
        }[];
    } & {
        id: number;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        categoryId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateProductDto: UpdateProductDto, files?: Express.Multer.File[]): Promise<{
        category: {
            id: number;
            name: string;
            slug: string;
        };
        images: {
            id: number;
            imageUrl: string;
            productId: number;
        }[];
    } & {
        id: number;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        categoryId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        categoryId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
