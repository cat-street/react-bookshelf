import { AnyAction } from 'redux';
import actionTypes from '../actions/actionTypes';
import { BooksState, BooksArray } from '../../types/bookshelf';
import { sortBooks } from '../../utils/actionHelpers';

const initialState: BooksState = {
  initialBooks: [],
  searchResults: [],
};

const sortBookShelf = (state: BooksArray, sortBy: string) => sortBooks(state, sortBy);

const updateRating = (state: BooksArray, id: string, rating: number) => {
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

const searchBook = (state: BooksArray, query: string) => state.filter((el) => (
  el.title.toLowerCase().includes(query) || el.author.toLowerCase().includes(query)
));

export default (
  state = initialState,
  {
    type, books, sortBy, id, rating, query,
  }: AnyAction,
): BooksArray => {
  switch (type) {
    case actionTypes.SET_BOOKS:
      return state.concat(books);

    case actionTypes.SORT_BOOKS:
      return sortBookShelf(state, sortBy);

    case actionTypes.UPDATE_RATING:
      return updateRating(state, id, rating);

    case actionTypes.SEARCH_BOOK:
      return searchBook(state, query);

    default:
      return state;
  }
};
