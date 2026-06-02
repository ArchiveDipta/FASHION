import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
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
