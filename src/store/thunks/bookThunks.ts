import { createAsyncThunk } from '@reduxjs/toolkit';

import { Book, BooksArray } from '../../types/books';

const setInitialBooks = createAsyncThunk('books/fetchAll', async () => {
  const response = await fetch('/api/books');
  return (await response.json()) as BooksArray;
});

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

const searchBooks = createAsyncThunk(
  'books/search',
  async (query: string) => {
    const response = await fetch(`/api/books?search=${query}`);
    return (await response.json()) as BooksArray;
  },
);

const getBook = createAsyncThunk('book/get', async (id: string) => {
  const response = await fetch(`/api/books/${id}`);
  return (await response.json()) as Book;
});

export {
  setInitialBooks, setRating, searchBooks, getBook,
};
