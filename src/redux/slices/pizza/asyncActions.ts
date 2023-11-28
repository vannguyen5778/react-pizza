import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FetchPizzasParams } from "./types";


export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params: FetchPizzasParams) => {
    const { sort, category, search, page } = params;
    const { data } = await axios.get(
      `https://65559a0b84b36e3a431dfcd7.mockapi.io/items?page=${page}&limit=4&${category}&sortBy=${sort}${search}`
    );
    return data;
  }
);