import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { setInitialBooks, setRating, sortBooks } from '../thunks/bookThunks';
import { BooksState } from '../../types/books';

const initialState: BooksState = {
  initialBooks: [],
  currentBooks: [],
  page: 0,
  booksPerPage: 10,
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      const start = (action.payload - 1) * state.booksPerPage;
      state.currentBooks = state.initialBooks.slice(
        start,
        start + state.booksPerPage,
      );
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setInitialBooks.fulfilled, (state, action) => {
        state.initialBooks = action.payload;
      })
      .addCase(sortBooks.fulfilled, (state, action) => {
        state.initialBooks = action.payload;
      })
      .addCase(setRating.fulfilled, (state, action) => {
        const updatedBook = action.payload;
        const index = state.currentBooks.findIndex(
          (el) => el.id === updatedBook.id,
        );
        state.currentBooks[index] = updatedBook;
      });
  },
});

export const { setPage } = bookSlice.actions;

export default bookSlice.reducer;
