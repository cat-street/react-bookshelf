import { AnyAction } from 'redux';
import actionTypes from '../actions/actionTypes';
import { Book } from '../../types/bookshelf';
import { sortBooks } from '../../utils/actionHelpers';

const initialState: Array<Book> = [];

const sortBookShelf = (state: Array<Book>, sortBy: string) => sortBooks(state, sortBy);

const updateRating = (state: Array<Book>, id: string, rating: number) => {
  const newState = [...state];
  const chosenBookIndex = newState.findIndex((el) => el.id === id);
  if (chosenBookIndex >= 0) {
    const chosenBook = newState[chosenBookIndex];
    chosenBook.rating = parseFloat(((
      chosenBook.rating * chosenBook.votes + rating
    ) / (chosenBook.votes + 1)).toFixed(1));
    chosenBook.votes += 1;
    newState[chosenBookIndex] = chosenBook;
  }
  return newState;
};

export default (
  state = initialState,
  {
    type, books, sortBy, id, rating,
  }: AnyAction,
): Array<Book> => {
  switch (type) {
    case actionTypes.SET_BOOKS:
      return state.concat(books);

    case actionTypes.SORT_BOOKS:
      return sortBookShelf(state, sortBy);

    case actionTypes.UPDATE_RATING:
      return updateRating(state, id, rating);

    default:
      return state;
  }
};
