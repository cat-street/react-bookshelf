import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BooksArray } from '../../types/books';

interface SliceState {
  initialBooks: BooksArray;
  currentBooks: BooksArray;
  page: number;
  booksPerPage: number;
}

const initialState: SliceState = {
  initialBooks: [],
  currentBooks: [],
  page: 0,
  booksPerPage: 10,
};

const setInitialBooks = createAsyncThunk('books/fetchAll', async () => {
  const response = await fetch('/api/books');
  return (await response.json()) as BooksArray;
});

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.currentBooks = state.initialBooks.slice(
        (action.payload - 1) * state.booksPerPage,
        state.booksPerPage,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setInitialBooks.fulfilled, (state, action) => {
      state.initialBooks = action.payload;
    });
  },
});

export const { setPage } = bookSlice.actions;
export { setInitialBooks };

export default bookSlice.reducer;
