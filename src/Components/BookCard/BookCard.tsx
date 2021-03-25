import { FC } from 'react';
import { Card, Col, ListGroup } from 'react-bootstrap';

import { Book } from '../../types/bookshelf';
import BookRating from '../BookRating/BookRating';
import './BookCard.css';

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
    <Card>
      <Card.Img
        variant="top"
        src={book.cover || '/images/cover.jpg'}
        className="w-75 mx-auto mt-3 card__image"
      />
      <Card.Body>
        <Card.Title className="text-uppercase">{book.title}</Card.Title>
        <Card.Subtitle className="text-muted mb-3">{book.author}</Card.Subtitle>
        <Card.Text>{`${book.description}...`}</Card.Text>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <BookRating rating={book.rating} id={book.id} />
        </ListGroup.Item>
      </ListGroup>
    </Card>
  </Col>
);

export default BookCard;
