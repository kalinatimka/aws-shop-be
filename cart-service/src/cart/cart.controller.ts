import { Controller, Get, Delete, Put, Body, Post, HttpStatus, Param } from '@nestjs/common';

import { OrderService } from '../order';

import { CartService } from './services';
import { calculateCartTotal } from './models-rules';

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) { }

  @Get('/all')
  async getAllCarts() {
    const cart = await this.cartService.getAll();

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart },
    }
  }

  @Get(':userId')
  async findUserCart(@Param('userId') userId: string) {
    const cart = await this.cartService.findOrCreateByUserId(userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart },
    }
  }

  @Put(':cartId')
  async updateCartItem(@Param('cartId') cartId: string, @Body() body) {
    const { productId, count, productPrice } = body;

    const cart = await this.cartService.findById(cartId);

    if (cart.status === 'ORDERED') {
      const statusCode = HttpStatus.BAD_REQUEST;

      return {
        statusCode,
        message: 'Cart is ordered',
      }
    }

    const updated = await this.cartService.updateOrCreateItemById(cartId, productId, count, productPrice);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { updated },
    }
  }

  @Delete(':cartId')
  async deleteCartItem(@Param('cartId') cartId: string, @Body() body) {
    const { productId } = body;

    const cart = await this.cartService.findById(cartId);

    if (cart.status === 'ORDERED') {
      const statusCode = HttpStatus.BAD_REQUEST;

      return {
        statusCode,
        message: 'Cart is ordered',
      }
    }

    const deleted = await this.cartService.deleteItemById(cartId, productId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { deleted },
    }
  }

  @Post('checkout/:cartId')
  async checkout(@Param('cartId') cartId: string, @Body() body) {
    const { payment, delivery, comments, status } = body;
    const cart = await this.cartService.findById(cartId);

    if (!(cart && cart.items.length)) {
      const statusCode = HttpStatus.BAD_REQUEST;

      return {
        statusCode,
        message: 'Cart is empty',
      }
    }

    const total = calculateCartTotal(cart);
    const created = await this.orderService.create(cart.userId, cart.id, payment, delivery, comments, status, total );

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { created }
    }
  }
}
