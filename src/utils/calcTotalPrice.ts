import { CartItem } from "@/redux/slices/cart/types";

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, obj) => (obj.count ?? 0) * obj.price + sum, 0);
};
