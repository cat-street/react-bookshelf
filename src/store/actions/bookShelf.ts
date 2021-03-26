import { Dispatch } from 'redux';

import actionTypes from './actionTypes';
import * as mockData from '../../mock/mockData.json';
import { BooksArray, Sort, SortBy } from '../../types/bookshelf';
import { fillAuthor, sortBooks } from '../../utils/actionHelpers';

const setBooks = (books: BooksArray) => ({
  type: actionTypes.SET_BOOKS,
  books,
});

export const sortBookShelf = (sortBy: SortBy) => ({
  type: actionTypes.SORT_BOOKS,
  sortBy,
});

export const updateRating = (id: string, rating: number) => ({
  type: actionTypes.UPDATE_RATING,
  id,
  rating,
});

export const searchBook = (query: string) => ({
  type: actionTypes.SEARCH_BOOK,
  query,
});

export const setPage = (page: number) => ({
  type: actionTypes.SET_PAGE,
  page,
});

export const fetchBooks = () => async (dispatch: Dispatch) => {
  try {
    const books = mockData.items.map((el) => ({
      id: el.id,
      title: el.volumeInfo.title,
      author: fillAuthor(el.volumeInfo.authors),
      cover: el.volumeInfo.imageLinks?.thumbnail || '',
      description: el.volumeInfo.description?.slice(0, 120) || '',
      year: el.volumeInfo.publishedDate || '',
      rating: parseFloat((Math.random() * 4 + 1).toFixed(1)),
      votes: Math.round(Math.random() * 10),
      ownerId: 'mock',
    }));
    if (books) {
      const sortedBooks = sortBooks(books, 'title', Sort.ASC);
      dispatch(setBooks(sortedBooks));
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
