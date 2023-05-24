import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

export const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    navbarToggler: (state) => {
      state = !state;
      return state;
    },
  },
});

export const { navbarToggler } = navbarSlice.actions;

export default navbarSlice.reducer;
