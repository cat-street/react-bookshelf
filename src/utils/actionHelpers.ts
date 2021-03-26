import { BooksArray, Sort } from '../types/bookshelf';

const fillAuthor = (authors: string | string[] | undefined): string => {
  if (authors) {
    return typeof authors === 'string' ? authors : authors.join(', ');
  }
  return 'No Author';
};

const sortBooks = (arr: BooksArray, arg: string, sort: Sort) => {
  const order = sort === Sort.ASC ? [1, -1] : [-1, 1];
  return [...arr].sort((a, b) => {
    if (a[arg] > b[arg]) {
      return order[0];
    }
    if (a[arg] < b[arg]) {
      return order[1];
    }
    return 0;
  });
};

export { fillAuthor, sortBooks };
