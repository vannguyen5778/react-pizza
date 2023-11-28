import { configureStore } from "@reduxjs/toolkit";
import filter from "@/redux/slices/filter/slice";
import cart from "@/redux/slices/cart/slice";
import pizza from "@/redux/slices/pizza/slice";
export const store = configureStore({
  reducer: { filter, cart, pizza },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
