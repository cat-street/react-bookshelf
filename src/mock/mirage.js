import {
  createServer, Model, Response, RestSerializer,
// eslint-disable-next-line import/no-extraneous-dependencies
} from 'miragejs';

import mockBooks from './mock.json';

export default function makeServer({ environment = 'test' } = {}) {
  const server = createServer({
    environment,

    models: {
      book: Model,
      user: Model,
    },

    fixtures: {
      books: mockBooks.items,
    },

    serializers: {
      book: RestSerializer.extend({
        root: false,
        embed: true,
      }),
    },

    seeds(serv) {
      serv.loadFixtures();
      serv.create('user', { userId: 'test-user', password: '12345' });
    },

    routes() {
      this.namespace = 'api';

      this.get('/books', (schema, request) => {
        const { search } = request.queryParams;
        return search
          ? schema.books
            .all()
            .filter(
              (el) =>
                el.title.toLowerCase().includes(search.toLowerCase())
                || el.author.toLowerCase().includes(search.toLowerCase()),
            )
          : schema.books.all();
      });

      this.get('/books/:id');

      this.patch('/books/:id', (schema, request) => {
        const vote = JSON.parse(request.requestBody);
        const book = schema.books.find(request.params.id);
        const newVotes = { ...book.votes, ...vote };
        const votesArr = Object.values(newVotes);
        const rating = votesArr.reduce((red, el) => red + el) / votesArr.length;
        book.update('votes', newVotes);
        book.update('rating', rating);
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

      this.post('/login', (schema, request) => {
        const { userId, password } = JSON.parse(request.requestBody);
        const user = schema.users.findBy({ userId });
        if (!user) {
          return new Response(401, {}, { message: 'Username or password is incorrect' });
        }
        if (user.password !== password) {
          return new Response(401, {}, { message: 'Password is incorrect' });
        }
        return { id: user.id, userId: user.userId };
      });
    },
  });

  return server;
}
