import { CartService } from './cart.service';
export declare class AddToCartDto {
    productId: number;
    quantity?: number;
}
export declare class UpdateCartDto {
    quantity: number;
}
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(req: any): Promise<({
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
    addToCart(req: any, body: AddToCartDto): Promise<{
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
    updateCartItem(req: any, id: number, body: UpdateCartDto): Promise<({
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
    removeFromCart(req: any, id: number): Promise<{
        message: string;
    }>;
    clearCart(req: any): Promise<{
        message: string;
    }>;
}
