import { createSlice } from '@reduxjs/toolkit';

import { login, logout, checkUser } from '../thunks/authThunks';
import { AuthState } from '../../types/auth';

const initialState: AuthState = {
  userId: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.error = null;
        state.userId = action.payload.userId;
      })
      .addCase(login.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        }
      })
      .addCase(logout.fulfilled, (state) => {
        state.userId = null;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.userId = action.payload.userId;
      });
  },
});

export const { resetError } = authSlice.actions;

export default authSlice.reducer;
