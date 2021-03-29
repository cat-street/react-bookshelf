import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Col, ListGroup } from 'react-bootstrap';

import { updateRating } from '../../store/actions/index';
import { Book, UserStar } from '../../types/books';
import { AuthState } from '../../types/auth';

import BookRating from '../BookRating/BookRating';
import { calculateRating } from '../../utils/booksHelpers';
import './BookCard.css';

type Props = {
  userId: string | null;
  book: Book;
  onUpdateRating: (id: string, rating: number, user: UserStar) => void;
};

const BookCard: FC<Props> = ({ userId, book, onUpdateRating }: Props) => {
  const handleUpdateRating = (vote: number, rating: number) => {
    onUpdateRating(book.id, rating, { user: 'test-user', vote });
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
        <Link to={`/${book.category}/${book.id}`} className="w-75 mx-auto mt-3">
          <Card.Img
            variant="top"
            src={book.cover ? book.cover : '/images/cover.jpg'}
            className="card__image"
          />
        </Link>
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
              rating={calculateRating(book.votes)}
              votes={Object.keys(book.votes).length}
              ownVote={book.votes['test-user'] || 0}
              onUpdate={handleUpdateRating}
            />
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  );
};

const mapStateToProps = (state: Record<string, AuthState>) => ({
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch: any) => ({
  onUpdateRating: (id: string, rating: number, user: UserStar) =>
    dispatch(updateRating(id, rating, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(BookCard));
