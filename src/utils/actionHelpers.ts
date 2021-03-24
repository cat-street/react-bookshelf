import { Book } from '../types/bookshelf';

const fillAuthor = (authors: string | Array<string> | undefined): string => {
  if (authors) {
    return typeof authors === 'string' ? authors : authors.join(', ');
  }
  return 'No Author';
};

const sortBooks = (arr: Array<Book>, arg: string) => [...arr].sort((a, b) => {
  if (a[arg] > b[arg]) {
    return 1;
  }
  if (a[arg] < b[arg]) {
    return -1;
  }
  return 0;
});

export { fillAuthor, sortBooks };
