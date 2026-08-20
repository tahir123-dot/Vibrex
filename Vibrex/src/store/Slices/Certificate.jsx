import { createSlice } from "@reduxjs/toolkit";
import { fetchCertificate,createCertificate } from "../Api/certficateApi";


const initialState = {
  // ---- used by the public verify page ----
  certificate: null,
  loading: false,
  error: null,

  // ---- used by the admin "Add Certificate" form ----
  creating: false,
  createError: null,
  createdCertificate: null,
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
    clearCreateStatus: (state) => {
      state.createdCertificate = null;
      state.createError = null;
      state.creating = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ---- FETCH (verify) ----
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
      })

      // ---- CREATE (admin add form) ----
      .addCase(createCertificate.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })
      .addCase(createCertificate.fulfilled, (state, action) => {
        state.creating = false;
        state.createdCertificate = action.payload; // { certificate, verifyUrl }
      })
      .addCase(createCertificate.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload;
      });
  },
});

export const { clearCertificate, clearCreateStatus } = certificateSlice.actions;
export default certificateSlice.reducer;