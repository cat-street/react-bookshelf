import { Dispatch } from 'redux';

import actionTypes from './actionTypes';
import * as mockData from '../../mock/mockData.json';
import { Book } from '../../types/bookshelf';

const fillAuthor = (authors: string | Array<string> | undefined): string => {
  if (authors) {
    return typeof authors === 'string' ? authors : authors.join(', ');
  }
  return 'No Author';
};

const sortBooks = (arr: Array<Book>, arg: string) => [...arr].sort((a, b) => {
  if (a[arg] > b[arg]) {
    return 1;
  }
  if (a[arg] < b[arg]) {
    return -1;
  }
  return 0;
});

const setBooks = (books: Array<Book>) => ({
  type: actionTypes.SET_BOOKS,
  books,
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

export const sortName = () => ({
  type: actionTypes.SORT_TITLE,
});
