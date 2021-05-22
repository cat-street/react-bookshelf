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

const sortBooks = createAsyncThunk(
  'books/sortBy',
  async ({ type, order }: { type: string; order: string }) => {
    const response = await fetch(`/api/books?sorting=${type}&order=${order}`);
    return (await response.json()) as BooksArray;
  },
);

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
    builder.addCase(setInitialBooks.fulfilled, (state, action) => {
      state.initialBooks = action.payload;
    });
    builder.addCase(sortBooks.fulfilled, (state, action) => {
      state.initialBooks = action.payload;
    });
  },
});

export const { setPage } = bookSlice.actions;
export { setInitialBooks, sortBooks };

export default bookSlice.reducer;
