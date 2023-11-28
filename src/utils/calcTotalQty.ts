import { CartItem } from "@/redux/slices/cart/slice";

export const calcTotalQty = (items: CartItem[]) => {
  return items.reduce((total, obj) => total + obj.count, 0);
};
