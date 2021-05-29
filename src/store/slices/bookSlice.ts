import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  setInitialBooks, setRating, searchBooks,
} from '../thunks/bookThunks';
import { BooksState, SortBy } from '../../types/books';
import compareFunc from '../../utils/mirageHelpers';

const initialState: BooksState = {
  initialBooks: [],
  currentBooks: [],
  page: 0,
  booksPerPage: 10,
  sort: 'title',
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
    sortBooks(state, action: PayloadAction<{ type: SortBy, order: string }>) {
      const { type, order } = action.payload;
      state.sort = type;
      state.initialBooks = state.initialBooks.sort(compareFunc(type, order));
    },
    setSort(state, action: PayloadAction<SortBy>) {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setInitialBooks.fulfilled, (state, action) => {
        state.initialBooks = action.payload;
      })
      .addCase(setRating.fulfilled, (state, action) => {
        const updatedBook = action.payload;
        const index = state.currentBooks.findIndex(
          (el) => el.id === updatedBook.id,
        );
        state.currentBooks[index] = updatedBook;
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.initialBooks = action.payload;
      });
  },
});

export const { setPage, sortBooks, setSort } = bookSlice.actions;

export default bookSlice.reducer;
