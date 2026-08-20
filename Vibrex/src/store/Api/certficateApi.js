import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL;

export const fetchCertificate = createAsyncThunk(
  "fetch/certificate",
  async ({ certificateId, token }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/certificates/verify/${certificateId}/${token}`);
      return res.data; 
    } catch (error) {
      
      return rejectWithValue(
        error.response?.data?.message || "Certificate not found or invalid"
      );
    }
  }
);