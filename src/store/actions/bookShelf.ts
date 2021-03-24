import { Dispatch } from 'redux';

import actionTypes from './actionTypes';
import * as mockData from '../../mock/mockData.json';
import { Book } from '../../types/bookshelf';
import { fillAuthor, sortBooks } from '../../utils/actionHelpers';

const setBooks = (books: Array<Book>) => ({
  type: actionTypes.SET_BOOKS,
  books,
});

export const sortBookShelf = (sortBy: string) => ({
  type: actionTypes.SORT_BOOKS,
  sortBy,
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
      rating: (Math.random() * 10).toFixed(2),
      ownerId: 'mock',
    }));
    if (books) {
      const sortedBooks = sortBooks(books, 'title');
      dispatch(setBooks(sortedBooks));
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
