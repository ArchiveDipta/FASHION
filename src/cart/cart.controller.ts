import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, ParseIntPipe,
  UseGuards, Request,
} from '@nestjs/common';
import {
  ApiBearerAuth, ApiTags, ApiOperation,
  ApiResponse, ApiProperty,
} from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CartService } from './cart.service';

export class AddToCartDto {
  @ApiProperty({ example: 1, description: 'ID produk yang ingin ditambahkan' })
  @IsInt()
  productId: number;

  @ApiProperty({ example: 1, description: 'Jumlah produk', required: false, default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number;
}

export class UpdateCartDto {
  @ApiProperty({ example: 2, description: 'Jumlah baru (0 = hapus item)' })
  @IsInt()
  @Min(0)
  quantity: number;
}

@ApiTags('Cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Lihat isi keranjang belanja saya' })
  @ApiResponse({ status: 200, description: 'Daftar item keranjang' })
  getCart(@Request() req) {
    return this.cartService.getCart(req.user.userId);
  }

  @Post()
  @ApiOperation({ summary: 'Tambah produk ke keranjang' })
  @ApiResponse({ status: 201, description: 'Produk berhasil ditambahkan ke keranjang' })
  @ApiResponse({ status: 404, description: 'Produk tidak ditemukan' })
  addToCart(@Request() req, @Body() body: AddToCartDto) {
    return this.cartService.addToCart(
      req.user.userId,
      body.productId,
      body.quantity ?? 1,
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update jumlah item keranjang (quantity 0 = hapus)' })
  @ApiResponse({ status: 200, description: 'Jumlah item berhasil diupdate' })
  @ApiResponse({ status: 404, description: 'Item keranjang tidak ditemukan' })
  updateCartItem(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCartDto,
  ) {
    return this.cartService.updateCartItem(req.user.userId, id, body.quantity);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Hapus satu item dari keranjang' })
  @ApiResponse({ status: 200, description: 'Item berhasil dihapus dari keranjang' })
  @ApiResponse({ status: 404, description: 'Item keranjang tidak ditemukan' })
  removeFromCart(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.cartService.removeFromCart(req.user.userId, id);
  }

  @Delete()
  @ApiOperation({ summary: 'Kosongkan semua isi keranjang' })
  @ApiResponse({ status: 200, description: 'Keranjang berhasil dikosongkan' })
  clearCart(@Request() req) {
    return this.cartService.clearCart(req.user.userId);
  }
}
