import { configureStore } from "@reduxjs/toolkit";
import sliceReducer from "./Slice";

const Store = configureStore({
  reducer: {
    weather: sliceReducer,
  },
});
export default Store;
