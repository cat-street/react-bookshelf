import { createAsyncThunk } from '@reduxjs/toolkit';

import { User, UserData, AuthError } from '../../types/auth';

const login = createAsyncThunk<UserData, User, { rejectValue: AuthError }>(
  'auth/login',
  async ({ userId, password }, thunkApi) => {
    const response = await fetch('api/login', {
      method: 'POST',
      body: JSON.stringify({ userId, password }),
    });
    if (!response.ok) {
      return thunkApi.rejectWithValue((await response.json()));
    }
    const userData = await response.json() as UserData;
    localStorage.setItem('bookshelfId', userData.userId);
    return userData;
  },
);

const logout = createAsyncThunk(
  'auth/logout',
  () => localStorage.removeItem('bookshelfId'),
);

const checkUser = createAsyncThunk(
  'auth/checkUser',
  async (userId: string, thunkApi) => {
    const response = await fetch(`api/login/${userId}`);
    if (!response.ok) {
      return thunkApi.rejectWithValue((await response.json()));
    }
    return (await response.json()) as { userId: string };
  },
);

export { login, logout, checkUser };
