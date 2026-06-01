import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrdersService } from './orders.service';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('checkout')
  checkout(@Request() req, @Body() body: { address?: string }) {
    return this.ordersService.checkout(req.user.userId, body.address);
  }

  @Get()
  getMyOrders(@Request() req) {
    return this.ordersService.getMyOrders(req.user.userId);
  }

  @Get(':id')
  getOrderDetail(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.ordersService.getOrderDetail(req.user.userId, id);
  }
}
