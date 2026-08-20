import { createSlice } from "@reduxjs/toolkit";
import { fetchCertificate } from "../Api/certficateApi";

const initialState = {
  certificate: null,
  loading: false,
  error: null,
};

const certificateSlice = createSlice({
  name: "certificates",
  initialState,
  reducers: {
    clearCertificate: (state) => {
      state.certificate = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCertificate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCertificate.fulfilled, (state, action) => {
        state.loading = false;
        state.certificate = action.payload.certificate;
      })
      .addCase(fetchCertificate.rejected, (state, action) => {
        state.loading = false;
        state.certificate = null;
        state.error = action.payload;
      });
  },
});

export const { clearCertificate } = certificateSlice.actions;
export default certificateSlice.reducer;