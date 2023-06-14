import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { getMerchandiseInventoryService } from './stockServices';

const initialState = {
  allMerchandise: [],
  preSoldOutMerchandise: [],
  preExpMerchandise: [],
  expMerchandise: [],
  isLoading: false,
  error: '',
};

// action get merchandise inventory in stock
export const getInventoryStock = createAsyncThunk('stock/inventory', async ({}, thunkAPI) => {
  try {
    const result = await getMerchandiseInventoryService();
    return result.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const StockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    pending: (state) => {
      state.isLoading = true;
    },
    finished: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInventoryStock.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allMerchandise = action.payload.allMerchandise;
      state.preSoldOutMerchandise = action.payload.preSoldOutMerchandise;
      state.preExpMerchandise = action.payload.preExpMerchandise;
      state.expMerchandise = action.payload.expMerchandise;
    });
  },
});

// get data stock from store
export const getAllMerchandise = (state) => state.stock?.allMerchandise;
export const getPreSoldOutMerchandise = (state) => state.stock?.preSoldOutMerchandise;
export const getPreExpMerchandise = (state) => state.stock?.preExpMerchandise;
export const getExpMerchandise = (state) => state.stock?.expMerchandise;

export default StockSlice.reducer;
