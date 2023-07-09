import { createSlice } from '@reduxjs/toolkit';

const breadcrumbSlice = createSlice({
  name: 'breadcrumb',
  initialState: {
    breadcrumbList: [
      {
        name: 'haha',
        slug: '',
      },
    ],
  },
  reducers: {
    addNewBreadcrumb: (state, action) => {
      state.breadcrumb.push(action.payload);
    },
    removeLastBreadcrumb: (state) => {
      state.breadcrumb.pop();
    },
  },
});
export const { addNewBreadcrumb, removeLastBreadcrumb } = breadcrumbSlice.actions;
export default breadcrumbSlice.reducer;
