import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

export const scrollSlice = createSlice({
  name: "scroll",
  initialState,
  reducers: {
    scrolling: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { scrolling } = scrollSlice.actions;

export default scrollSlice.reducer;
