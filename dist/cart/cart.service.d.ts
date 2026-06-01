import { PrismaService } from '../prisma/prisma.service';
export declare class CartService {
    private prisma;
    constructor(prisma: PrismaService);
    getCart(userId: number): Promise<({
        product: {
            images: {
                id: number;
                imageUrl: string;
                productId: number;
            }[];
        } & {
            id: number;
            name: string;
            description: string | null;
            createdAt: Date;
            categoryId: number;
            price: import("@prisma/client/runtime/library").Decimal;
            stock: number;
            updatedAt: Date;
        };
    } & {
        id: number;
        createdAt: Date;
        productId: number;
        quantity: number;
        userId: number;
    })[]>;
    addToCart(userId: number, productId: number, quantity: number): Promise<{
        product: {
            images: {
                id: number;
                imageUrl: string;
                productId: number;
            }[];
        } & {
            id: number;
            name: string;
            description: string | null;
            createdAt: Date;
            categoryId: number;
            price: import("@prisma/client/runtime/library").Decimal;
            stock: number;
            updatedAt: Date;
        };
    } & {
        id: number;
        createdAt: Date;
        productId: number;
        quantity: number;
        userId: number;
    }>;
    updateCartItem(userId: number, cartItemId: number, quantity: number): Promise<({
        product: {
            images: {
                id: number;
                imageUrl: string;
                productId: number;
            }[];
        } & {
            id: number;
            name: string;
            description: string | null;
            createdAt: Date;
            categoryId: number;
            price: import("@prisma/client/runtime/library").Decimal;
            stock: number;
            updatedAt: Date;
        };
    } & {
        id: number;
        createdAt: Date;
        productId: number;
        quantity: number;
        userId: number;
    }) | {
        message: string;
    }>;
    removeFromCart(userId: number, cartItemId: number): Promise<{
        message: string;
    }>;
    clearCart(userId: number): Promise<{
        message: string;
    }>;
}
