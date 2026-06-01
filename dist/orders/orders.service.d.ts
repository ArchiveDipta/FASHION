import { PrismaService } from '../prisma/prisma.service';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    checkout(userId: number, address?: string): Promise<{
        items: ({
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
            price: import("@prisma/client/runtime/library").Decimal;
            productId: number;
            quantity: number;
            orderId: number;
        })[];
    } & {
        id: number;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.OrderStatus;
    }>;
    getMyOrders(userId: number): Promise<({
        items: ({
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
            price: import("@prisma/client/runtime/library").Decimal;
            productId: number;
            quantity: number;
            orderId: number;
        })[];
    } & {
        id: number;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.OrderStatus;
    })[]>;
    getOrderDetail(userId: number, orderId: number): Promise<{
        items: ({
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
            price: import("@prisma/client/runtime/library").Decimal;
            productId: number;
            quantity: number;
            orderId: number;
        })[];
    } & {
        id: number;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.OrderStatus;
    }>;
}
