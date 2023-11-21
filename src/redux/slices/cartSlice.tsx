import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type CartItem = {
  id: string; 
  title: string; 
  type: number; 
  size: number; 
  price: number;
  count: number; 
};
type CartState = {
  totalPrice: number;
  items: CartItem[];
  totalQty: number;
};
const initialState: CartState = {
  totalPrice: 0,
  totalQty: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      state.items.push(action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.count * obj.price + sum;
      }, 0);
      state.totalQty = state.items.reduce((currentQty, obj) => {
        return currentQty + obj.count
      }, 0)
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
    },
    setItems(state, action) {
      state.items = action.payload
    }
  },
});

export const { addItem, removeItem, clearItems, setItems } = cartSlice.actions;
export default cartSlice.reducer;
