import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { loginService } from './AuthServices';

const initialState = {
  user: {},
  accessToken: '',
  isLoading: false,
};

// create action async Login
export const loginAction = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
  try {
    const response = await loginService(email, password);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.status);
  }
});

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    pending: (state) => {
      state.isLoading = true;
    },
    finished: (state) => {
      state.isLoading = false;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    });

    // list pending
    const pendingList = [loginAction.pending];

    // list fi

    builder.addMatcher(isAnyOf(...pendingList), (state) => {
      state.isLoading = true;
    });
  },
});

export const { getUser } = AuthSlice.actions;

// get state from auth
export const getUserId = (state) => state.auth.user?.id;

export default AuthSlice.reducer;
