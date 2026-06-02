"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrdersService = class OrdersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkout(userId, address) {
        const cartItems = await this.prisma.cartItem.findMany({
            where: { userId },
            include: { product: true },
        });
        if (cartItems.length === 0) {
            throw new common_1.BadRequestException('Keranjang kosong, tidak bisa checkout');
        }
        const totalPrice = cartItems.reduce((sum, item) => {
            return sum + Number(item.product.price) * item.quantity;
        }, 0);
        const order = await this.prisma.$transaction(async (tx) => {
            const newOrder = await tx.order.create({
                data: {
                    userId,
                    totalPrice,
                    address,
                    items: {
                        create: cartItems.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            price: item.product.price,
                        })),
                    },
                },
                include: {
                    items: {
                        include: { product: { include: { images: true } } },
                    },
                },
            });
            await tx.cartItem.deleteMany({ where: { userId } });
            return newOrder;
        });
        return order;
    }
    async getMyOrders(userId) {
        return this.prisma.order.findMany({
            where: { userId },
            include: {
                items: {
                    include: { product: { include: { images: true } } },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getOrderDetail(userId, orderId) {
        const order = await this.prisma.order.findFirst({
            where: { id: orderId, userId },
            include: {
                items: {
                    include: { product: { include: { images: true } } },
                },
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Order tidak ditemukan');
        return order;
    }
    async payOrder(userId, orderId) {
        const order = await this.prisma.order.findFirst({
            where: { id: orderId, userId },
        });
        if (!order)
            throw new common_1.NotFoundException('Order tidak ditemukan');
        if (order.status !== 'PENDING')
            throw new common_1.BadRequestException('Order tidak bisa dibayar atau sudah dibayar');
        return this.prisma.order.update({
            where: { id: orderId },
            data: { status: 'PAID' },
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map