import { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
  Container, Col, Row, Image, Button, Badge,
} from 'react-bootstrap';

import { getBook, searchBook, updateRating } from '../../store/actions/index';
import {
  Book, BooksState, SearchType, UserStar,
} from '../../types/bookShelf';
import BookRating from '../../components/BookRating/BookRating';
import { calculateRating } from '../../utils/bookShelfHelpers';

type Props = {
  currentBook: Book;
  onGetBook: (id: string) => void;
  onSearchBook: (query: string, searchType: SearchType) => void;
  onUpdateRating: (id: string, user: UserStar) => void;
};

const SingleBook: FC<Props> = ({
  currentBook,
  onGetBook,
  onSearchBook,
  onUpdateRating,
}: Props) => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const searchByAuthor = () => {
    onSearchBook(currentBook.author, 'title');
    history.push('/');
  };

  const handleUpdateRating = (vote: number) => {
    onUpdateRating(currentBook.id, { user: 'test-user', vote });
  };

  useEffect(() => {
    onGetBook(id);
  }, [id, onGetBook]);

  return (
    <Container className="p-4 pt-5">
      <Row>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Image
            src={
              currentBook.cover
                ? `/images/books/${currentBook.cover}`
                : '/images/cover.jpg'
            }
            rounded
            className="w-100"
          />
        </Col>
        <Col>
          <h2>
            {currentBook.title}
            <Badge variant="info" className="ml-2 mr-3">
              {currentBook.category}
            </Badge>
            <Button size="sm" variant="outline-success">
              Edit
            </Button>
          </h2>
          <h4 className="text-muted">
            <Button
              variant="link"
              type="button"
              size="lg"
              className="p-0 m-0 mb-2"
              onClick={searchByAuthor}
            >
              {currentBook.author}
            </Button>
          </h4>
          {currentBook.votes && (
            <BookRating
              rating={calculateRating(currentBook.votes)}
              votes={Object.keys(currentBook.votes).length}
              onUpdate={handleUpdateRating}
            />
          )}
          <p className="my-4">{currentBook.description}</p>
          <p>
            <strong>Published:</strong>
            {' '}
            {currentBook.published}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state: BooksState) => ({
  currentBook: state.currentBook,
});

const mapDispatchToProps = (dispatch: any) => ({
  onGetBook: (id: string) => dispatch(getBook(id)),
  onSearchBook: (query: string, searchType: SearchType) =>
    dispatch(searchBook(query, searchType)),
  onUpdateRating: (id: string, user: UserStar) =>
    dispatch(updateRating(id, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleBook);
