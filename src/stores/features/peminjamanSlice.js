import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isKembali: {},
};

export const peminjamanListSlice = createSlice({
  name: "peminjamanList",
  initialState,
  reducers: {
    setIsKembali(state, action) {
      const { id, value } = action.payload;
      state.isKembali[id] = value;
    },
  },
});

export const { setIsKembali } = peminjamanListSlice.actions;

export default peminjamanListSlice.reducer;
