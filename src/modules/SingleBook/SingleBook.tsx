import { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
  Container, Col, Row, Image, Button, Badge,
} from 'react-bootstrap';

import { getBook, searchBook } from '../../store/actions/index';
import { Book, BooksState, SearchType } from '../../types/bookshelf';
import BookRating from '../../components/BookRating/BookRating';

type Props = {
  currentBook: Book;
  onGetBook: (id: string) => void;
  onSearchBook: (query: string, searchType: SearchType) => void;
};

const SingleBook: FC<Props> = ({
  currentBook,
  onGetBook,
  onSearchBook,
}: Props) => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const searchByAuthor = () => {
    onSearchBook(currentBook.author, 'title');
    history.push('/');
  };

  useEffect(() => {
    onGetBook(id);
  }, [id, onGetBook]);

  return (
    <Container className="p-4 pt-5">
      <Row>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Image
            src={currentBook.cover || '/images/cover.jpg'}
            rounded
            className="w-100"
          />
        </Col>
        <Col>
          <h2>
            {currentBook.title}
            <Badge variant="info" className="ml-2 mr-3">
              {currentBook.categories}
            </Badge>
            <Button size="sm" variant="outline-success">Edit</Button>
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
          <BookRating rating={currentBook.rating} id={currentBook.id} />
          <p className="my-4">{currentBook.description}</p>
          <p>
            <strong>Published:</strong>
            {' '}
            {currentBook.year}
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
  onSearchBook: (
    query: string, searchType: SearchType,
  ) => dispatch(searchBook(query, searchType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleBook);
