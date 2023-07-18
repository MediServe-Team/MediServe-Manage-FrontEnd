import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  breadcrumbList: [
    {
      name: 'Trang chủ',
      slug: '/',
    },
  ],
};

const breadcrumbSlice = createSlice({
  initialState,
  name: 'breadcrumb',
  reducers: {
    addNewBreadcrumb: (state, action) => {
      let i = 0;
      state.breadcrumbList.forEach((e) => {
        if (e.name === action.payload.name) {
          i = i + 1;
        }
      });
      if (i === 0) {
        state.breadcrumbList.push(action.payload);
      }
    },
    removeLastBreadcrumb: (state) => {
      state.breadcrumbList.pop();
    },
  },
});

export const { addNewBreadcrumb, removeLastBreadcrumb, refreshBreadcrumb } = breadcrumbSlice.actions;
export default breadcrumbSlice.reducer;
