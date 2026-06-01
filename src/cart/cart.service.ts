import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: number) {
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

  async addToCart(userId: number, productId: number, quantity: number) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException('Produk tidak ditemukan');

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

  async updateCartItem(userId: number, cartItemId: number, quantity: number) {
    const item = await this.prisma.cartItem.findFirst({
      where: { id: cartItemId, userId },
    });
    if (!item) throw new NotFoundException('Item keranjang tidak ditemukan');

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

  async removeFromCart(userId: number, cartItemId: number) {
    const item = await this.prisma.cartItem.findFirst({
      where: { id: cartItemId, userId },
    });
    if (!item) throw new NotFoundException('Item keranjang tidak ditemukan');

    await this.prisma.cartItem.delete({ where: { id: cartItemId } });
    return { message: 'Item berhasil dihapus dari keranjang' };
  }

  async clearCart(userId: number) {
    await this.prisma.cartItem.deleteMany({ where: { userId } });
    return { message: 'Keranjang berhasil dikosongkan' };
  }
}
