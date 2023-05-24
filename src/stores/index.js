import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./features";

const store = configureStore({
  reducer: rootReducer,
});

export { store };
