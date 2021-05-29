import { configureStore } from '@reduxjs/toolkit';

import booksReducer from './slices/bookSlice';

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { setPage, sortBooks, setSort } from './slices/bookSlice';
export {
  setInitialBooks, setRating, searchBooks,
} from './thunks/bookThunks';

export default store;
