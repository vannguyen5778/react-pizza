import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryID: 0,
    sortID: 0,
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryID(state, action) {
            console.log('action setCategoryID', action)
            state.categoryID = action.payload;
        }
    }
})

export const { setCategoryID } = filterSlice.actions
export default filterSlice.reducer;