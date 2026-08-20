import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;


export const createCertificate = createAsyncThunk(
  "certificates/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/certificates`, payload);
      return res.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create certificate"
      );
    }
  }
);



export const fetchCertificate = createAsyncThunk(
  "fetch/certificate",
  async ({ certificateId, token }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${API_URL}/certificates/verify/${certificateId}/${token}`,
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Certificate not found or invalid",
      );
    }
  },
);
