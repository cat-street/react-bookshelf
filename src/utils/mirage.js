import {
  createServer, Model,
// eslint-disable-next-line import/no-extraneous-dependencies
} from 'miragejs';

import mockBooks from '../mock/mock.json';
import compareFunc from './mirageHelpers';

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

      // this.get('/books');
      this.get('/books/:id');
      this.get('/books/:id/comments', (schema, request) => {
        const book = schema.books.find(request.params.id);
        return book.comments;
      });
      this.get('/books', (schema, request) => {
        const type = request.queryParams.sorting;
        const { order } = request.queryParams;
        return schema.books.all().sort(compareFunc(type, order));
      });
    },
  });

  return server;
}
