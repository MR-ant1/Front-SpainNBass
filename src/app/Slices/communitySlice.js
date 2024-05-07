
import { createSlice } from '@reduxjs/toolkit';

export const communitySlice = createSlice({
    name: 'community',
    initialState: {
      category: ""
    },
    reducers: {
      navigateCategory: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
    }
    
});

export const { navigateCategory } = communitySlice.actions;

export const categoryData = (state) => state.community;

export default communitySlice.reducer;