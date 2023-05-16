import { Injectable } from '@nestjs/common';

import { InjectConnection } from '@nestjs/typeorm';
import { Carts } from 'src/database/entities/cart.entity';
import { Orders } from 'src/database/entities/order.entity';
import { Connection } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async create(userId, cartId, payment, delivery, comments, status, total) {
    try {
      await this.connection.transaction(async (entityManager) => {
        const transactionalOrdersRepo = entityManager.getRepository(Orders);
        const transactionalCartsRepo = entityManager.getRepository(Carts);

        await transactionalOrdersRepo.insert({ userId, cartId, payment, delivery, comments, status, total });
        await transactionalCartsRepo.update({ id: cartId }, { status: 'ORDERED' });
      })
    } catch (e) {
      return false;
    }
    return true;
  }
}
