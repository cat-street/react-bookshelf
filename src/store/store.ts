import { configureStore } from '@reduxjs/toolkit';

import booksReducer from './slices/bookSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    books: booksReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {
  setPage,
  sortBooks,
  setSort,
  clearBook,
} from './slices/bookSlice';
export {
  setInitialBooks,
  setRating,
  searchBooks,
  getBook,
} from './thunks/bookThunks';

export { resetError } from './slices/authSlice';
export { login, logout, checkUser } from './thunks/authThunks';

export default store;
