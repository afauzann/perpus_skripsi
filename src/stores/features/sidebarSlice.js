import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    sidebarToggler: (state) => {
      state = !state;
      return state;
    },
  },
});

export const { sidebarToggler } = sidebarSlice.actions;

export default sidebarSlice.reducer;
