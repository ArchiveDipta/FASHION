import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(dto: CreateProductDto, files: Express.Multer.File[]): Promise<{
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
        description: string | null;
        id: number;
        createdAt: Date;
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        categoryId: number;
        updatedAt: Date;
    }>;
    findAll(page?: string, limit?: string, search?: string): Promise<{
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
            description: string | null;
            id: number;
            createdAt: Date;
            name: string;
            price: import("@prisma/client/runtime/library").Decimal;
            stock: number;
            categoryId: number;
            updatedAt: Date;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
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
        description: string | null;
        id: number;
        createdAt: Date;
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        categoryId: number;
        updatedAt: Date;
    }>;
    update(id: number, dto: UpdateProductDto, files: Express.Multer.File[]): Promise<{
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
        description: string | null;
        id: number;
        createdAt: Date;
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        categoryId: number;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        description: string | null;
        id: number;
        createdAt: Date;
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        categoryId: number;
        updatedAt: Date;
    }>;
}
