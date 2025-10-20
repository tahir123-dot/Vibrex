import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 API ka base URL (backend ka server)
const API_URL = import.meta.env.VITE_API_URL;

// ========== Async Thunks ==========

// Add Product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/products/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.product;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error adding product"
      );
    }
  }
);

// Get All Products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL);
      return res.data.products;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error fetching products"
      );
    }
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error deleting product"
      );
    }
  }
);

// ========== Slice ==========
const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Add Product
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export default productSlice.reducer;
