import { FC } from 'react';
import { Link } from 'react-router-dom';
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
      <Link
        to={`/${book.categories[0]}/${book.id}`}
        className="w-75 mx-auto mt-3"
      >
        <Card.Img
          variant="top"
          src={book.cover || '/images/cover.jpg'}
          className="card__image"
        />
      </Link>
      <Card.Body>
        <Card.Title className="text-uppercase">{book.title}</Card.Title>
        <Card.Subtitle className="text-muted mb-3">{book.author}</Card.Subtitle>
        <Card.Text>
          {book.description && `${book.description.slice(0, 120)}...`}
        </Card.Text>
        <Link to={`/${book.categories[0]}/${book.id}`}>
          Read more...
        </Link>
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
