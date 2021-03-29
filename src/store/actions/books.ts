import { BooksActionTypes as actionTypes } from './actionTypes';
import { SortBy, SearchType, UserStar } from '../../types/books';

export const setBooks = () => ({
  type: actionTypes.SET_BOOKS,
});

export const sortBooks = (sortBy: SortBy) => ({
  type: actionTypes.SORT_BOOKS,
  sortBy,
});

export const updateRating = (id: string, rating: number, user: UserStar) => ({
  type: actionTypes.UPDATE_RATING,
  id,
  rating,
  user,
});

export const searchBook = (query: string, searchType: SearchType) => ({
  type: actionTypes.SEARCH_BOOK,
  query,
  searchType,
});

export const setPage = (page: number) => ({
  type: actionTypes.SET_PAGE,
  page,
});

export const getBook = (id: string) => ({
  type: actionTypes.GET_BOOK,
  id,
});

export const addComment = (ownerId: string, comment: string) => ({
  type: actionTypes.ADD_COMMENT,
  ownerId,
  comment,
});

export const editBook = (book: Record<string, string>) => ({
  type: actionTypes.EDIT_BOOK,
  book,
});