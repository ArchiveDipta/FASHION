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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CartService = class CartService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCart(userId) {
        const items = await this.prisma.cartItem.findMany({
            where: { userId },
            include: {
                product: {
                    include: { images: true },
                },
            },
        });
        return items;
    }
    async addToCart(userId, productId, quantity) {
        const product = await this.prisma.product.findUnique({ where: { id: productId } });
        if (!product)
            throw new common_1.NotFoundException('Produk tidak ditemukan');
        const existing = await this.prisma.cartItem.findUnique({
            where: { userId_productId: { userId, productId } },
        });
        if (existing) {
            return this.prisma.cartItem.update({
                where: { id: existing.id },
                data: { quantity: existing.quantity + quantity },
                include: { product: { include: { images: true } } },
            });
        }
        return this.prisma.cartItem.create({
            data: { userId, productId, quantity },
            include: { product: { include: { images: true } } },
        });
    }
    async updateCartItem(userId, cartItemId, quantity) {
        const item = await this.prisma.cartItem.findFirst({
            where: { id: cartItemId, userId },
        });
        if (!item)
            throw new common_1.NotFoundException('Item keranjang tidak ditemukan');
        if (quantity <= 0) {
            await this.prisma.cartItem.delete({ where: { id: cartItemId } });
            return { message: 'Item dihapus dari keranjang' };
        }
        return this.prisma.cartItem.update({
            where: { id: cartItemId },
            data: { quantity },
            include: { product: { include: { images: true } } },
        });
    }
    async removeFromCart(userId, cartItemId) {
        const item = await this.prisma.cartItem.findFirst({
            where: { id: cartItemId, userId },
        });
        if (!item)
            throw new common_1.NotFoundException('Item keranjang tidak ditemukan');
        await this.prisma.cartItem.delete({ where: { id: cartItemId } });
        return { message: 'Item berhasil dihapus dari keranjang' };
    }
    async clearCart(userId) {
        await this.prisma.cartItem.deleteMany({ where: { userId } });
        return { message: 'Keranjang berhasil dikosongkan' };
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map