import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
const initialState = {
  clickedCategory: 0,
  sortID: 0,
  currentPage: 1,
  sort: '',
  searchedValue: '',

};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setClickedCategory(state, action) {
      state.clickedCategory = action.payload;
    },
    setSortID(state, action) {
      state.sortID = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
        state.sort = action.payload.sort;
        state.currentPage = Number(action.payload.currentPage);
        state.clickedCategory = Number(action.payload.clickedCategory);
        console.log("setFilters" , state.currentPage, state.sort, state.clickedCategory )

    },
    setSearchedValue(state, action) {
      state.searchedValue = action.payload;
    }
  },
});

export const selectFilter = (state: RootState) => state.filter;
export const { setClickedCategory, setSortID, setCurrentPage, setFilters, setSearchedValue } = filterSlice.actions;
export default filterSlice.reducer;
