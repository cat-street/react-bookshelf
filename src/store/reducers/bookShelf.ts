import { AnyAction } from 'redux';
import actionTypes from '../actions/actionTypes';
import { Book } from '../../types/bookshelf';

const initialState: Array<Book> = [];

const sortBooks = (arr: Array<Book>, arg: string) => [...arr].sort((a, b) => {
  if (a[arg] > b[arg]) {
    return 1;
  }
  if (a[arg] < b[arg]) {
    return -1;
  }
  return 0;
});

const sortByTitle = (state: Array<Book>) => sortBooks(state, 'title');

const sortByAuthor = (state: Array<Book>) => sortBooks(state, 'author');

const sortByRating = (state: Array<Book>) => sortBooks(state, 'rating');

export default (
  state = initialState,
  { type, books }: AnyAction,
): Array<Book> => {
  switch (type) {
    case actionTypes.SET_BOOKS:
      return state.concat(books);

    case actionTypes.SORT_TITLE:
      return sortByTitle(state);

    case actionTypes.SORT_AUTHOR:
      return sortByAuthor(state);

    case actionTypes.SORT_RATING:
      return sortByRating(state);

    default:
      return state;
  }
};
