import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Slices/LoginSlice";
import productReducer from "./Slices/productSlice";
import gallaryReducer from "./Slices/Gallery";
import certificateReducer from "./Slices/Certificate";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    products: productReducer,
    gallery: gallaryReducer,
    certificates: certificateReducer,
  },
});
