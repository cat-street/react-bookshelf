// import { AnyAction } from 'redux';
import actionTypes from '../actions/actionTypes';
import {
  BooksState,
  BooksArray,
  Sort,
  SortBy,
  Reducer,
} from '../../types/bookshelf';
import { sortBooks } from '../../utils/actionHelpers';

const initialState: BooksState = {
  initialBooks: [],
  searchResults: [],
  currentBooks: [],
  searching: false,
  page: 1,
  sort: Sort.ASC,
  sortBy: 'title',
  booksPerPage: 10,
};

const setBooks = (state: BooksState, books: BooksArray) => {
  const newState = {
    initialBooks: state.initialBooks.concat(books),
    searchResults: [],
    currentBooks: books.slice(0, state.booksPerPage),
  };
  return { ...state, ...newState };
};

const sortBookShelf = (state: BooksState, sortBy: SortBy) => {
  const sortOrder = sortBy === 'rating' ? Sort.DESC : Sort.ASC;
  const sortedBooks = sortBooks(state.initialBooks, sortBy, sortOrder);
  const searchResults = state.searchResults.length > 0
    ? sortBooks(state.searchResults, sortBy, state.sort)
    : [];
  const currentBooks = state.searching
    ? searchResults.slice(0, state.booksPerPage)
    : sortedBooks.slice(0, state.booksPerPage);
  const newState = {
    initialBooks: sortedBooks,
    searchResults,
    currentBooks,
    page: 1,
    sortBy,
  };
  return { ...state, ...newState };
};

const updateRating = (state: BooksState, id: string, rating: number) => {
  const updatedBooks = [...state.initialBooks];
  const chosenBookIndex = updatedBooks.findIndex((el) => el.id === id);
  const chosenBook = updatedBooks[chosenBookIndex];
  chosenBook.rating = parseFloat(
    (
      (chosenBook.rating * chosenBook.votes + rating)
        / (chosenBook.votes + 1)
    ).toFixed(1),
  );
  chosenBook.votes += 1;
  updatedBooks[chosenBookIndex] = chosenBook;
  const currentBooks = [...state.currentBooks];
  const currentBookIndex = currentBooks.findIndex((el) => el.id === id);
  currentBooks[currentBookIndex].rating = chosenBook.rating;
  const newState = {
    initialBooks: updatedBooks,
    currentBooks,
  };
  return { ...state, ...newState };
};

const searchBook = (state: BooksState, query: string) => {
  let newState: Record<string, any>;
  if (!query) {
    newState = {
      searchResults: [],
      currentBooks: state.initialBooks.slice(0, state.booksPerPage),
      searching: false,
    };
  } else {
    const searchResults = state.initialBooks.filter(
      (el) => el.title.toLowerCase().includes(query.toLowerCase())
        || el.author.toLowerCase().includes(query.toLowerCase()),
    );
    const currentBooks = searchResults.slice(0, state.booksPerPage);
    newState = {
      searchResults,
      currentBooks,
      searching: true,
    };
  }
  return { ...state, ...newState };
};

const setPage = (state: BooksState, page: number) => {
  const sliceStart = page * state.booksPerPage - 10;
  const currentBooks = state.searching
    ? state.searchResults.slice(sliceStart, sliceStart + state.booksPerPage)
    : state.initialBooks.slice(sliceStart, sliceStart + state.booksPerPage);
  const newState = {
    currentBooks,
    page,
  };
  return { ...state, ...newState };
};

export default (
  state = initialState,
  {
    type, books, sortBy, id, rating, query, page,
  }: Reducer,
): BooksState => {
  switch (type) {
    case actionTypes.SET_BOOKS:
      return setBooks(state, books);

    case actionTypes.SORT_BOOKS:
      return sortBookShelf(state, sortBy);

    case actionTypes.UPDATE_RATING:
      return updateRating(state, id, rating);

    case actionTypes.SEARCH_BOOK:
      return searchBook(state, query);

    case actionTypes.SET_PAGE:
      return setPage(state, page);

    default:
      return state;
  }
};
