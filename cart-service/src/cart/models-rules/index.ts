import { Carts } from 'src/database/entities/cart.entity';
import { CartItems } from 'src/database/entities/cart-item.entity';

/**
 * @param {Cart} cart
 * @returns {number}
 */
export function calculateCartTotal(cart: Carts): number {
  return cart ? cart.items.reduce((acc: number, { productPrice, count }: CartItems) => {
    return acc += productPrice * count;
  }, 0) : 0;
}
