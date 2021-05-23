// export enum Sort { DESC, ASC }

export type UserStar = { user: string, vote: number };
export type SortBy = ('author' | 'title' | 'rating');
export type SearchType = ('title' | 'genre');

export type Comment = {
  id: string,
  ownerId: string,
  date: string,
  text: string,
};

export interface Book {
  [key: string]: string | number | any[] | Record<string, any>,
  id: string,
  title: string,
  author: string,
  cover: string,
  description: string,
  published: string,
  ownerId: string,
  category: string,
  rating: number,
  votes: Record<string, any>,
  comments: Comment[]
}

export interface BooksArray extends Array<Book> {}

export interface BooksState {
  initialBooks: BooksArray;
  currentBooks: BooksArray;
  page: number;
  booksPerPage: number;
}

// export interface BooksState {
//   initialBooks: BooksArray,
//   searchResults: BooksArray,
//   currentBooks: BooksArray,
//   searching: boolean,
//   page: number,
//   sort: Sort,
//   sortBy: SortBy,
//   booksPerPage: number,
//   currentBook: Book,
// }

// export interface Reducer {
//   type: string,
//   sortBy: SortBy,
//   id: string,
//   rating: number,
//   user: UserStar,
//   ownerId: string,
//   query: string,
//   searchType: SearchType,
//   page: number,
//   comment: string,
//   book: Record<string, string>,
// }
