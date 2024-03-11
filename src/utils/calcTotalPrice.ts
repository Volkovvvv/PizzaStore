import { CartItem } from '../redux/cart/types';

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum: number, obj: CartItem) => {
    return obj.price * obj.count + sum;
  }, 0);
};
