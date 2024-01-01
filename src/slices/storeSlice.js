import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getStoreInforService, setActivity } from '../services/storeService';

const initialState = {
  stores: {},
  isLoading: false,
  error: '',
};

export const getStoreInfor = createAsyncThunk('api/stores/activity', async (thunkAPI) => {
  try {
    const result = await getStoreInforService();
    return result.data;
  } catch (err) {
    thunkAPI.rejectWithValue(err.response.message);
  }
});

export const setStoreActivity = createAsyncThunk('put-api/stores/activity', async (isOpen, thunkAPI) => {
  try {
    const result = await setActivity(isOpen);
    if (result.status === 200) {
      return isOpen;
    }
  } catch (err) {
    thunkAPI.rejectWithValue(err.response.message);
  }
});

const storeSlice = createSlice({
  initialState,
  name: 'store',
  reducers: {
    pending: (state) => {
      state.isLoading = true;
    },
    finish: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStoreInfor.fulfilled, (state, action) => {
      state.stores = action.payload;
      state.isLoading = false;
      state.error = '';
    });

    builder.addCase(setStoreActivity.fulfilled, (state, action) => {
      state.stores.isOpen = action.payload;
      state.isLoading = false;
      state.error = '';
    });
  },
});

export default storeSlice.reducer;

// get status activity
export const getStoreActivity = (state) => state?.store?.stores?.isOpen;
