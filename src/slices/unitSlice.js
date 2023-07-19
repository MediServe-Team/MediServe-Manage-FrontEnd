import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUnitsService } from '../services/unitServices';

const initialState = {
  units: [],
  isLoading: false,
  error: '',
};

export const getAllUnits = createAsyncThunk('api/units/all', async (thunkAPI) => {
  try {
    const result = await getAllUnitsService();
    return result.data;
  } catch (err) {
    thunkAPI.rejectWithValue(err.response.message);
  }
});

const unitSlice = createSlice({
  initialState,
  name: 'unit',
  reducers: {
    pending: (state) => {
      state.isLoading = true;
    },
    finish: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUnits.fulfilled, (state, action) => {
      state.units = action.payload;
      state.isLoading = false;
      state.error = '';
    });
  },
});

export default unitSlice.reducer;

// get all unit from redux store
export const getListUnits = (state) => state.unit?.units;
