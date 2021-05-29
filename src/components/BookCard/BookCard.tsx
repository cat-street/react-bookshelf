import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, ListGroup } from 'react-bootstrap';

import { setRating } from '../../store/store';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';

import BookRating from '../BookRating/BookRating';

import { Book } from '../../types/books';

import './BookCard.css';

type Props = {
  book: Book;
};

const BookCard = ({ book }: Props) => {
  const userId = useAppSelector((state) => state.auth.userId);
  const dispatch = useAppDispatch();

  const handleUpdateRating = (vote: Record<string, number>) => {
    dispatch(setRating({ id: book.id, vote }));
  };

  return (
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
          src={book.cover ? `/images/books/${book.cover}` : '/images/cover.jpg'}
          className="card__image px-3 mt-3"
        />
        <Card.Body>
          <Card.Title className="text-uppercase">{book.title}</Card.Title>
          <Card.Subtitle className="text-muted mb-3">
            {book.author}
          </Card.Subtitle>
          <Card.Text>
            {book.description && `${book.description.slice(0, 120)}...`}
          </Card.Text>
          <Link to={`/${book.category}/${book.id}`}>Read more...</Link>
        </Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <BookRating
              userId={userId}
              rating={book.rating}
              votes={Object.keys(book.votes).length}
              ownVote={userId ? book.votes[userId] : 0}
              onUpdate={handleUpdateRating}
            />
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  );
};

export default memo(BookCard);
