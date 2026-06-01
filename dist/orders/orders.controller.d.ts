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
    getMyOrders(req: any): Promise<({
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
    getOrderDetail(req: any, id: number): Promise<{
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
