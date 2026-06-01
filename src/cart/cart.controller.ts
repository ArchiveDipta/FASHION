import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CartService } from './cart.service';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Request() req) {
    return this.cartService.getCart(req.user.userId);
  }

  @Post()
  addToCart(
    @Request() req,
    @Body() body: { productId: number; quantity?: number },
  ) {
    return this.cartService.addToCart(
      req.user.userId,
      body.productId,
      body.quantity ?? 1,
    );
  }

  @Patch(':id')
  updateCartItem(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { quantity: number },
  ) {
    return this.cartService.updateCartItem(req.user.userId, id, body.quantity);
  }

  @Delete(':id')
  removeFromCart(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.cartService.removeFromCart(req.user.userId, id);
  }

  @Delete()
  clearCart(@Request() req) {
    return this.cartService.clearCart(req.user.userId);
  }
}
