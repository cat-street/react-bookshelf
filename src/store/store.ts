import { configureStore } from '@reduxjs/toolkit';

import booksReducer from './slices/bookSlice';

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { setPage } from './slices/bookSlice';
export { setInitialBooks, sortBooks, setRating } from './thunks/bookThunks';

export default store;
