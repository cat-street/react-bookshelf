import actionTypes from '../store/actions/actionTypes';

export interface Book {
  [key: string]: string | number | any[],
  id: string,
  title: string,
  author: string,
  cover: string,
  description: string,
  published: string,
  ownerId: string,
  category: string,
  rating: number,
  voters: string[],
  comments: Record<string, string>[]
}

export interface BooksArray extends Array<Book> {}

export enum Sort { ASC, DESC }
export type SortBy = ('author' | 'title' | 'rating');
export type SearchType = ('title' | 'genre');

export interface BooksState {
  initialBooks: BooksArray,
  searchResults: BooksArray,
  currentBooks: BooksArray,
  searching: boolean,
  page: number,
  sort: Sort,
  sortBy: SortBy,
  booksPerPage: number,
  currentBook: Book,
}

export interface Reducer {
  type: actionTypes,
  sortBy: SortBy,
  id: string,
  rating: number,
  ownerId: string,
  query: string,
  searchType: SearchType,
  page: number,
}
