import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface FetchPizzasParams {
  sort: string;
  category: string;
  search: string;
  page: string;
}

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params: FetchPizzasParams, thunkAPI) => {
    const { sort, category, search, page } = params;
    const { data } = await axios.get(
      `https://65559a0b84b36e3a431dfcd7.mockapi.io/items?page=${page}&limit=4&${category}&sortBy=${sort}${search}`
    );
    console.log('hello')
    console.log(thunkAPI, thunkAPI.getState());
    return data;
  }
);

const initialState = {
  pizzas: [],
  status: "loading",
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
        state.status = "loading";
        state.pizzas = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.pizzas = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        state.pizzas = [];
      });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setPizzas } = pizzaSlice.actions;
export default pizzaSlice.reducer;
