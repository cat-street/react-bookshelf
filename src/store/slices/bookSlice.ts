import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  setInitialBooks, setRating, searchBooks, getBook,
} from '../thunks/bookThunks';
import { BooksState, SortBy } from '../../types/books';
import compareFunc from '../../utils/storeHelpers';

const initialState: BooksState = {
  initialBooks: [],
  currentBooks: [],
  page: 0,
  booksPerPage: 10,
  sort: 'title',
  openedBook: null,
  loading: false,
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
    clearBook(state) {
      state.openedBook = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setInitialBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(setInitialBooks.fulfilled, (state, action) => {
        state.initialBooks = action.payload;
        state.loading = false;
      })
      .addCase(setRating.fulfilled, (state, action) => {
        const updatedBook = action.payload;
        const index = state.currentBooks.findIndex(
          (el) => el.id === updatedBook.id,
        );
        state.currentBooks[index] = updatedBook;
        if (state.openedBook) state.openedBook = updatedBook;
      })
      .addCase(searchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.initialBooks = action.payload;
        state.loading = false;
      })
      .addCase(getBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.openedBook = action.payload;
        state.loading = false;
      });
  },
});

export const {
  setPage, sortBooks, setSort, clearBook,
} = bookSlice.actions;

export default bookSlice.reducer;
