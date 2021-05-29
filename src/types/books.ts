export type SortBy = ('author' | 'title' | 'rating');

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
  sort: SortBy;
  openedBook: Book | null;
  loading: boolean;
}
