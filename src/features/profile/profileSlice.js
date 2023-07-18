import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProfileServices } from './profileServices';

const initialState = {
  data: {},
  isLoading: false,
  error: '',
};

export const getProfile = createAsyncThunk('me/profile', async (token, thunkAPI) => {
  try {
    const response = await getProfileServices(token);
    return response;
  } catch (err) {
    thunkAPI.rejectWithValue(err?.response?.status);
  }
});

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    pending: (state) => {
      state.isLoading = true;
    },
    finish: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    //* Get profile
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.data = action.payload.data?.data;
      state.isLoading = false;
      state.error = '';
    });
  },
});

export default profileSlice.reducer;

// Get profile
export const getProfileData = (state) => state.profile?.data;
