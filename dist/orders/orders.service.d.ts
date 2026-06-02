import { PrismaService } from '../prisma/prisma.service';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    checkout(userId: number, address?: string): Promise<{
        items: ({
            product: {
                images: {
                    id: number;
                    productId: number;
                    imageUrl: string;
                }[];
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
                price: import("@prisma/client/runtime/library").Decimal;
                stock: number;
                categoryId: number;
            };
        } & {
            id: number;
            quantity: number;
            productId: number;
            price: import("@prisma/client/runtime/library").Decimal;
            orderId: number;
        })[];
    } & {
        id: number;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.OrderStatus;
        address: string | null;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getMyOrders(userId: number): Promise<({
        items: ({
            product: {
                images: {
                    id: number;
                    productId: number;
                    imageUrl: string;
                }[];
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
                price: import("@prisma/client/runtime/library").Decimal;
                stock: number;
                categoryId: number;
            };
        } & {
            id: number;
            quantity: number;
            productId: number;
            price: import("@prisma/client/runtime/library").Decimal;
            orderId: number;
        })[];
    } & {
        id: number;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.OrderStatus;
        address: string | null;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getOrderDetail(userId: number, orderId: number): Promise<{
        items: ({
            product: {
                images: {
                    id: number;
                    productId: number;
                    imageUrl: string;
                }[];
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
                price: import("@prisma/client/runtime/library").Decimal;
                stock: number;
                categoryId: number;
            };
        } & {
            id: number;
            quantity: number;
            productId: number;
            price: import("@prisma/client/runtime/library").Decimal;
            orderId: number;
        })[];
    } & {
        id: number;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.OrderStatus;
        address: string | null;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    payOrder(userId: number, orderId: number): Promise<{
        id: number;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.OrderStatus;
        address: string | null;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
