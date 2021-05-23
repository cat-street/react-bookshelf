import { createAsyncThunk } from '@reduxjs/toolkit';

import { Book, BooksArray } from '../../types/books';

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

const setRating = createAsyncThunk(
  'books/setRating',
  async ({ id, vote }: { id: string, vote: Record<string, number> }) => {
    const response = await fetch(`/api/books/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(vote),
    });
    return (await response.json()) as Book;
  },
);

export { setInitialBooks, sortBooks, setRating };
