import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Carts } from 'src/database/entities/cart.entity';
import { Repository } from 'typeorm';
import { CartItems } from 'src/database/entities/cart-item.entity';

@Injectable()
export class CartService {  
  constructor(
    @InjectRepository(Carts)
    private readonly cartsRepo: Repository<Carts>,
    @InjectRepository(CartItems)
    private readonly cartItemsRepo: Repository<CartItems>,
  ) {}

  async getAll(): Promise<Carts[]> {
    return await this.cartsRepo.find({ relations: ['items'] });
  }

  async findById(id: string): Promise<Carts> {
    return await this.cartsRepo.findOne({ where: { id }, relations: ['items'] });
  }

  async findByUserId(userId: string): Promise<Carts> {
    console.log(userId);
    return await this.cartsRepo.findOne({ where: { userId, status: "OPEN" }, relations: ['items'] });
  }

  async createByUserId(userId: string) {
    console.log('Cart creating...');
    const creationDate = new Date();
    const [ formattedCreationDate ] = creationDate.toISOString().split('T');
    await this.cartsRepo.insert({ userId, createdAt: formattedCreationDate, updatedAt: formattedCreationDate, status: "OPEN" })
    return await this.findByUserId(userId);
  }

  async findOrCreateByUserId(userId: string): Promise<Carts> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateOrCreateItemById(cartId: string, productId: string, count: number, productPrice: number): Promise<boolean> {
    try {
      const product = await this.cartItemsRepo.findOne({ where: { cartId, productId }});
      console.log('LALA', product);
      if (product) {
        await this.cartItemsRepo.update({ cartId, productId }, { count });
      } else {
        await this.cartItemsRepo.insert({ cartId, productId, count: 1, productPrice });
      }
    } catch (e) {
      return false;
    }
    return true;
  }

  async deleteItemById(cartId: string, productId: string): Promise<boolean> {
    try {
      await this.cartItemsRepo.delete({ cartId, productId });
    } catch (e) {
      return false;
    }
    return true;
  }

}
