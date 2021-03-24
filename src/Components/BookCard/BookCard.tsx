import { FC } from 'react';
import { Card, Col } from 'react-bootstrap';
import { Book } from '../../types/bookshelf';

type Props = {
  book: Book;
};

const BookCard: FC<Props> = ({ book }: Props) => (
  <Col
    xs="12"
    sm="6"
    md="4"
    lg="3"
    xl="2"
    className="px-1 mb-3 d-flex align-items-stretch"
  >
    <Card className="bookshelf__card">
      <Card.Img
        variant="top"
        src={book.cover || '/images/cover.jpg'}
        className="w-75 mx-auto mt-3"
      />
      <Card.Body>
        <Card.Title className="text-uppercase">{book.title}</Card.Title>
        <Card.Subtitle className="text-muted mb-3">{book.author}</Card.Subtitle>
        <Card.Text>{`${book.description}...`}</Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

export default BookCard;
