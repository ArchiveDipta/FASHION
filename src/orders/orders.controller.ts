import {
  Controller, Get, Post, Body, Param,
  ParseIntPipe, UseGuards, Request,
} from '@nestjs/common';
import {
  ApiBearerAuth, ApiTags, ApiOperation,
  ApiResponse, ApiProperty,
} from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { OrdersService } from './orders.service';

export class CheckoutDto {
  @ApiProperty({
    example: 'Jl. Merdeka No.1, Jakarta Pusat',
    description: 'Alamat pengiriman (opsional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;
}

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('checkout')
  @ApiOperation({ summary: 'Checkout — buat order dari isi keranjang' })
  @ApiResponse({ status: 201, description: 'Order berhasil dibuat, keranjang dikosongkan' })
  @ApiResponse({ status: 400, description: 'Keranjang kosong' })
  checkout(@Request() req, @Body() body: CheckoutDto) {
    return this.ordersService.checkout(req.user.userId, body.address);
  }

  @Get()
  @ApiOperation({ summary: 'Lihat semua order saya' })
  @ApiResponse({ status: 200, description: 'Daftar order berhasil diambil' })
  getMyOrders(@Request() req) {
    return this.ordersService.getMyOrders(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lihat detail satu order' })
  @ApiResponse({ status: 200, description: 'Detail order berhasil diambil' })
  @ApiResponse({ status: 404, description: 'Order tidak ditemukan' })
  getOrderDetail(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.ordersService.getOrderDetail(req.user.userId, id);
  }
}
