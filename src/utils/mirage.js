import {
  createServer, Model,
// eslint-disable-next-line import/no-extraneous-dependencies
} from 'miragejs';

import mockBooks from '../mock/mock.json';

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
        const { type } = request.queryParams;
        let compareFunc;
        switch (type) {
          case 'author':
            compareFunc = (a, b) => a.author < b.author;
            break;
          case 'rating':
            compareFunc = (a, b) => a.rating > b.rating;
            break;
          default:
            compareFunc = (a, b) => a.title > b.title;
        }
        const books = schema.books.all().sort((a, b) => b.title < a.title);
        return books;
      });
    },
  });

  return server;
}
