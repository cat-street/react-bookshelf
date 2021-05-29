import { createAsyncThunk } from '@reduxjs/toolkit';

import { Book, BooksArray } from '../../types/books';

const setInitialBooks = createAsyncThunk('books/fetchAll', async () => {
  const response = await fetch('/api/books');
  return (await response.json()) as BooksArray;
});

const setRating = createAsyncThunk(
  'books/setRating',
  async ({ id, vote }: { id: string; vote: Record<string, number> }) => {
    const response = await fetch(`/api/books/${id}/rating`, {
      method: 'PATCH',
      body: JSON.stringify(vote),
    });
    return (await response.json()) as Book;
  },
);

const searchBooks = createAsyncThunk(
  'books/search',
  async ({ where, query }: { where: string; query: string }) => {
    const response = await fetch(`/api/books?search=${query}&where=${where}`);
    return (await response.json()) as BooksArray;
  },
);

const getBook = createAsyncThunk('books/fetchOne', async (id: string) => {
  const response = await fetch(`/api/books/${id}`);
  return (await response.json()) as Book;
});

const editBook = createAsyncThunk(
  'books/editOne',
  async ({ id, fields }: { id: string; fields: Record<string, string> }) => {
    const response = await fetch(`/api/books/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(fields),
    });
    return (await response.json()) as Book;
  },
);

const addComment = createAsyncThunk(
  'books/addComment',
  async ({ id, ownerId, text }: { id: string; ownerId: string, text: string }) => {
    const comment = {
      id: Math.random().toString(36).substr(2, 9),
      ownerId,
      date: (new Date()).toDateString(),
      text,
    };
    const response = await fetch(`/api/books/${id}/comments`, {
      method: 'POST',
      body: JSON.stringify(comment),
    });
    return (await response.json()) as Book;
  },
);

export {
  setInitialBooks,
  setRating,
  searchBooks,
  getBook,
  editBook,
  addComment,
};
