import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCartFromLS } from "@/utils/getCartFromLS";
import { calcTotalPrice } from "@/utils/calcTotalPrice";
import { calcTotalQty } from "@/utils/calcTotalQty";
import { CartItem, CartState } from "./types";

const cartData = getCartFromLS();

const initialState: CartState = {
  totalPrice: calcTotalPrice(cartData),
  totalQty: calcTotalQty(cartData),
  items: cartData,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        if (findItem.count) findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = calcTotalPrice(state.items);
      state.totalQty = state.items.reduce((total, obj) => {
        return total + obj.count;
      }, 0);
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);
    },
    clearCart(state) {
      state.items = [];
    },
    setItems(state, action) {
      state.items = action.payload;
    },
    substractItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem && findItem.count) findItem.count--;
    },
  },
});

export const { addItem, removeItem, clearCart, setItems, substractItem } =
  cartSlice.actions;
export default cartSlice.reducer;
