import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clickedCategory: 0,
  sortID: 0,
  currentPage: 1,
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
        state.sortID = Number(action.payload.sortID);
        state.currentPage = action.payload.currentPage;
        state.clickedCategory = Number(action.payload.clickedCategory);

    }
  },
});

export const { setClickedCategory, setSortID, setCurrentPage, setFilters } = filterSlice.actions;
export default filterSlice.reducer;
