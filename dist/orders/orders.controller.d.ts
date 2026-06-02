import { OrdersService } from './orders.service';
export declare class CheckoutDto {
    address?: string;
}
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    checkout(req: any, body: CheckoutDto): Promise<{
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
    getMyOrders(req: any): Promise<({
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
    getOrderDetail(req: any, id: number): Promise<{
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
    payOrder(req: any, id: number): Promise<{
        id: number;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.OrderStatus;
        address: string | null;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
