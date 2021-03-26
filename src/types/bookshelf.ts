import actionTypes from '../store/actions/actionTypes';

export interface Book {
  [key: string]: string | number,
  id: string,
  title: string,
  author: string,
  cover: string,
  description: string,
  year: string,
  rating: number,
  votes: number,
  ownerId: string,
}

export interface BooksArray extends Array<Book> {}

export enum Sort { ASC, DESC }

export type SortBy = ('author' | 'title' | 'rating');

export interface BooksState {
  initialBooks: BooksArray,
  searchResults: BooksArray,
  currentBooks: BooksArray,
  searching: boolean,
  page: number,
  sort: Sort,
  sortBy: SortBy,
  booksPerPage: number,
}

export interface Reducer {
  type: actionTypes,
  books: BooksArray,
  sortBy: SortBy,
  id: string,
  rating: number,
  query: string,
  page: number,
}
