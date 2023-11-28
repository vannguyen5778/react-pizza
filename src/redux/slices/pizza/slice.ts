import { createSlice } from "@reduxjs/toolkit";
import { fetchPizzas } from "./asyncActions";

enum Status {
  LOADING = "loading", 
  SUCCESS = "success",
  ERROR = 'error'
}

const initialState = {
  pizzas: [],
  status: Status.LOADING,
};


const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.pizzas = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.pizzas = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.pizzas = [];
      });
  },
});

export const { setPizzas } = pizzaSlice.actions;
export default pizzaSlice.reducer;
