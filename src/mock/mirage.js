import {
  createServer, Model,
// eslint-disable-next-line import/no-extraneous-dependencies
} from 'miragejs';

import mockBooks from './mock.json';
import compareFunc from '../utils/mirageHelpers';

export default function makeServer({ environment = 'test' } = {}) {
  const server = createServer({
    environment,

    models: {
      book: Model,
    },

    fixtures: {
      books: mockBooks.items,
    },

    routes() {
      this.namespace = 'api';

      this.get('/books', (schema, request) => {
        const type = request.queryParams.sorting;
        const { order } = request.queryParams;
        return (type) ? schema.books.all().sort(compareFunc(type, order))
          : schema.books.all();
      });

      this.get('/books/:id');

      this.patch('/books/:id', (schema, request) => {
        const { rating, votes } = JSON.parse(request.requestBody);
        const book = schema.books.find(request.params.id);
        book.update('rating', rating);
        book.update('votes', votes);
        return book;
      });

      this.post('/books/:id', (schema, request) => {
        const editedBook = JSON.parse(request.requestBody);
        const book = schema.books.find(request.params.id);
        return book.update(editedBook);
      });

      this.get('/books/:id/comments', (schema, request) => {
        const book = schema.books.find(request.params.id);
        return book.comments;
      });

      this.post('/books/:id/comments', (schema, request) => {
        const book = schema.books.find(request.params.id);
        const comments = JSON.parse(request.requestBody);
        return book.update({ comments });
      });
    },
  });

  return server;
}
