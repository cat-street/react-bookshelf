import { AnyAction } from 'redux';
import actionTypes from '../actions/actionTypes';
import { Book } from '../../types/bookshelf';
import { sortBooks } from '../../utils/actionHelpers';

const initialState: Array<Book> = [];

const sortBookShelf = (state: Array<Book>, sortBy: string) => sortBooks(state, sortBy);

export default (
  state = initialState,
  { type, books, sortBy }: AnyAction,
): Array<Book> => {
  switch (type) {
    case actionTypes.SET_BOOKS:
      return state.concat(books);

    case actionTypes.SORT_BOOKS:
      return sortBookShelf(state, sortBy);

    default:
      return state;
  }
};
