import actionTypes from './actionTypes';
import { SortBy, SearchType } from '../../types/bookShelf';

export const setBooks = () => ({
  type: actionTypes.SET_BOOKS,
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
