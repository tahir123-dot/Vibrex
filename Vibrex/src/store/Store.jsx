import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Slices/LoginSlice";
import productReducer from "./Slices/productSlice";
import gallaryReducer from "./Slices/Gallery";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    products: productReducer,
    gallery: gallaryReducer,
  },
});
