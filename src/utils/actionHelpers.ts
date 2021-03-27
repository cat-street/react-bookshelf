import { BooksArray, Sort } from '../types/bookShelf';

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

// eslint-disable-next-line import/prefer-default-export
export { sortBooks };
