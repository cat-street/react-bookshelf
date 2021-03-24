import { FC } from 'react';
import { Container, Row } from 'react-bootstrap';
import BookCard from '../BookCard/BookCard';

const BookShelf: FC = () => (
  <Container fluid className="px-4">
    <Row>
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
    </Row>
  </Container>
);

export default BookShelf;
