import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { loginService, logoutService } from './AuthServices';

const initialState = {
  user: {},
  accessToken: '',
  isLoading: false,
  error: '',
};

// create action async Login
export const loginAction = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
  try {
    const response = await loginService(email, password);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const logoutAction = createAsyncThunk('auth/logout', async (axiosWithToken, thunkAPI) => {
  try {
    await logoutService(axiosWithToken);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
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
      state.error = '';
      // if(action.payload)
    });

    // logout
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = {};
      state.accessToken = '';
      state.error = '';
    });

    // list pending
    const pendingList = [loginAction.pending];

    // list reject
    const rejectList = [loginAction.rejected];

    builder.addMatcher(isAnyOf(...rejectList), (state, action) => {
      state.isLoading = false;
      if (action.payload?.code === 'ERR_NETWORK') {
        state.error = 'Kiểm tra kết nối internet';
      } else {
        state.error = action.payload?.message;
      }
    });

    builder.addMatcher(isAnyOf(...pendingList), (state) => {
      state.isLoading = true;
    });
  },
});

export const { getUser } = AuthSlice.actions;
export const { setAccessToken } = AuthSlice.actions;

// get state from auth
export const getUserId = (state) => state.auth.user?.id;
export const getPermitList = (state) => state.auth.user?.permitList;
export const getAccessToken = (state) => state.auth.accessToken;

export default AuthSlice.reducer;
