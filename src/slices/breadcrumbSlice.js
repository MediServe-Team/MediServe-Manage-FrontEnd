import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  breadcrumbList: [
    {
      name: 'Home',
      slug: '/',
    },
  ],
};

const breadcrumbSlice = createSlice({
  initialState,
  name: 'breadcrumb',
  reducers: {
    addNewBreadcrumb: (state, action) => {
      state.breadcrumbList.push(action.payload);
    },
    removeLastBreadcrumb: (state) => {
      state.breadcrumbList.pop();
    },
  },
});
export const { addNewBreadcrumb, removeLastBreadcrumb } = breadcrumbSlice.actions;
export default breadcrumbSlice.reducer;
