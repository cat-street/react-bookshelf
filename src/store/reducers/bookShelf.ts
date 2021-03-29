import { BookShelfActionTypes as actionTypes } from '../actions/actionTypes';
import {
  Book,
  BooksState,
  BooksArray,
  Sort,
  SortBy,
  SearchType,
  Reducer,
  UserStar,
} from '../../types/bookShelf.js';
import { sortBooks } from '../../utils/actionHelpers';
import * as mockData from '../../mock/mockDB.json';
import { calculateRating } from '../../utils/bookShelfHelpers';

const initialState: BooksState = {
  initialBooks: [],
  searchResults: [],
  currentBooks: [],
  searching: false,
  page: 1,
  sort: Sort.ASC,
  sortBy: 'title',
  booksPerPage: 10,
  currentBook: {} as Book,
};

const setBooks = (state: BooksState) => {
  const books: BooksArray = mockData.items.map((el) => ({
    id: el.id,
    title: el.title,
    author: el.author,
    cover: el.cover ? `/images/books/${el.cover}` : '',
    description: el.description,
    published: el.published,
    ownerId: el.ownerId,
    category: el.category || 'uncategorized',
    votes: el.votes,
    rating: calculateRating(el.votes),
    comments: el.comments,
  }));
  const sortedBooks = sortBooks(books, 'title', Sort.ASC);

  const newState = {
    initialBooks: state.initialBooks.concat(sortedBooks),
    searchResults: [],
    currentBooks: sortedBooks.slice(0, state.booksPerPage),
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

const updateRating = (
  state: BooksState,
  id: string,
  rating: number,
  { user, vote }: UserStar,
) => {
  const updatedBooks = [...state.initialBooks];
  const chosenBookIndex = updatedBooks.findIndex((el) => el.id === id);
  const chosenBook = updatedBooks[chosenBookIndex];

  chosenBook.votes[user] = vote;
  chosenBook.rating = rating;
  updatedBooks[chosenBookIndex] = chosenBook;
  const currentBooks = [...state.currentBooks];
  const currentBookIndex = currentBooks.findIndex((el) => el.id === id);
  currentBooks[currentBookIndex] = chosenBook;

  const newState = {
    initialBooks: updatedBooks,
    currentBooks,
  };
  return { ...state, ...newState };
};

const searchBook = (
  state: BooksState, query: string, searchType: SearchType,
) => {
  let newState: Record<string, any>;
  if (!query) {
    newState = {
      searchResults: [],
      currentBooks: state.initialBooks.slice(0, state.booksPerPage),
      searching: false,
    };
  } else {
    const cb = searchType === 'title'
      ? (el: Book) => el.title.toLowerCase().includes(query.toLowerCase())
        || el.author.toLowerCase().includes(query.toLowerCase())
      : (el: Book) => el.category === query;
    const searchResults = state.initialBooks.filter(cb);
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

const getBook = (state: BooksState, id: string) => {
  const fetchedBook = mockData.items.find((el) => el.id === id);
  if (fetchedBook) {
    const cover = fetchedBook.cover ? `/images/books/${fetchedBook.cover}` : '';
    const rating = calculateRating(fetchedBook.votes);
    const currentBook = { ...fetchedBook, cover, rating };

    const newState = { currentBook };
    return { ...state, ...newState };
  }
  return state;
};

const addComment = (
  state: BooksState,
  ownerId: string,
  comment: string,
) => {
  const book = { ...state.currentBook };
  book.comments.push({
    id: Math.random().toString(36).substr(2, 9),
    ownerId,
    date: (new Date()).toDateString(),
    text: comment,
  });

  const newState = {
    currentBook: book,
  };
  return { ...state, ...newState };
};

// Edits are currently saved only on a single book view,
// because of how getBook fetches a book from a mock 'database'
const editBook = (state: BooksState, book: Record<string, string>) => {
  const newBook = { ...state.currentBook, ...book };
  const newState = {
    currentBook: newBook,
  };
  return { ...state, ...newState };
};

export default (
  state = initialState,
  {
    type,
    sortBy,
    id,
    rating,
    user,
    ownerId,
    query,
    searchType,
    page,
    comment,
    book,
  }: Reducer,
): BooksState => {
  switch (type) {
    case actionTypes.SET_BOOKS:
      return setBooks(state);

    case actionTypes.SORT_BOOKS:
      return sortBookShelf(state, sortBy);

    case actionTypes.UPDATE_RATING:
      return updateRating(state, id, rating, user);

    case actionTypes.SEARCH_BOOK:
      return searchBook(state, query, searchType);

    case actionTypes.SET_PAGE:
      return setPage(state, page);

    case actionTypes.GET_BOOK:
      return getBook(state, id);

    case actionTypes.ADD_COMMENT:
      return addComment(state, ownerId, comment);

    case actionTypes.EDIT_BOOK:
      return editBook(state, book);

    default:
      return state;
  }
};
