import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { getAllCategoryServices } from './categoryServices';

const initialState = {
  categories: [],
  isLoading: false,
  error: '',
};

export const getAllCategory = createAsyncThunk('api/categories/all', async (thunkAPI) => {
  try {
    const response = await getAllCategoryServices();
    return response.data;
  } catch (err) {
    thunkAPI.rejectWithValue(err?.response?.status);
  }
});

const categorySlice = createSlice({
  initialState,
  name: 'category',
  reducers: {
    pending: (state) => {
      state.isLoading = true;
    },
    finish: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    //* Get all categories
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      state.categories = action.payload.data;
      state.isLoading = false;
      state.error = '';
    });

    builder.addMatcher(getAllCategory.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });

    builder.addMatcher(getAllCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default categorySlice.reducer;

export const { finish, pending } = categorySlice.actions;

// Get list categories
export const getlistCategories = (state) => state.category?.categories;
