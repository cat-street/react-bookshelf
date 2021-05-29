import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
  Container,
  Col,
  Row,
  Image,
  Button,
  Badge,
  Spinner,
} from 'react-bootstrap';

// import {
//   getBook, searchBook, updateRating, addComment, editBook,
// } from '../../store/actions/index';
import {
  Book,
  SearchType,
  UserStar,
} from '../../types/books';
import BookRating from '../BookRating/BookRating';
import CommentForm from '../CommentForm/CommentForm';
import { calculateRating } from '../../utils/booksHelpers';
import CommentCard from '../CommentCard/CommentCard';
import EditBookModal from '../EditBookModal/EditBookModal';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { clearBook, getBook, setRating } from '../../store/store';

// type Props = {
//   currentBook: Book;
//   userId: string | null;
//   onGetBook: (id: string) => void;
//   onSearchBook: (query: string, searchType: SearchType) => void;
//   onUpdateRating: (id: string, rating: number, user: UserStar) => void;
//   onAddComment: (ownerId: string, comment: string) => void;
//   onEditBook: (book: Record<string, string>) => void;
// };

// const SingleBook = ({
//   currentBook,
//   userId,
//   onGetBook,
//   onSearchBook,
//   onUpdateRating,
//   onAddComment,
//   onEditBook,
// }: Props) => {

const SingleBook = () => {
  // const [loading, setLoading] = useState(true);
  const [commentOpen, setCommentOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const currentBook = useAppSelector((state) => state.books.openedBook);
  const loading = useAppSelector((state) => state.books.loading);
  const dispatch = useAppDispatch();

  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  // const searchByAuthor = () => {
  //   onSearchBook(currentBook.author, 'title');
  //   history.push('/');
  // };

  const handleUpdateRating = (vote: Record<string, number>) => {
    dispatch(setRating({ id, vote }));
  };

  // const handleAddComment = (comment: string) => {
  //   if (userId) {
  //     onAddComment(userId, comment);
  //     setCommentOpen(false);
  //   }
  // };

  const handleEditClick = () => {
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  // useEffect(() => {
  //   onGetBook(id);
  //   setLoading(false);
  // }, [id, onGetBook]);

  useEffect(() => {
    dispatch(getBook(id));
    return () => {
      dispatch(clearBook());
    };
  }, [dispatch, id]);

  return (
    <Container className="p-4 pt-5">
      {/* {showModal && (
        <EditBookModal
          book={currentBook}
          onHide={hideModal}
          onEdit={onEditBook}
        />
      )} */}
      {loading || !currentBook ? (
        <Row className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Row>
      ) : (
        <>
          <Row className="mb-4">
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
                <span className="mr-3">{currentBook.title}</span>
                <Badge variant="info" className="mr-3">
                  {currentBook.category || 'Uncategorized'}
                </Badge>
                {/* {userId && userId === currentBook.ownerId ? (
                  <Button
                    size="sm"
                    variant="outline-success"
                    onClick={handleEditClick}
                  >
                    Edit
                  </Button>
                ) : null} */}
              </h2>
              <h3 className="text-muted">
                <Button
                  variant="link"
                  type="button"
                  size="lg"
                  className="p-0 m-0 mb-2"
                  // onClick={searchByAuthor}
                >
                  {currentBook.author}
                </Button>
              </h3>
              <BookRating
                userId="test-user"
                rating={currentBook.rating}
                votes={Object.keys(currentBook.votes).length}
                ownVote={currentBook.votes['test-user'] || 0}
                onUpdate={handleUpdateRating}
              />
              <p className="my-4">{currentBook.description}</p>
              <p>
                <strong>Published:</strong>
                {` ${currentBook.published}`}
              </p>
            </Col>
          </Row>
          <Row>
            <h4 className="ml-4">Comments:</h4>
            {currentBook.comments.map((el) => (
              <CommentCard key={el.id} comment={el} />
            ))}
          </Row>
          {/* {userId && (
            <Row>
              {commentOpen ? (
                <CommentForm onAdd={handleAddComment} />
              ) : (
                <Button
                  variant="outline-success"
                  className="mx-auto px-5"
                  onClick={() => setCommentOpen(true)}
                >
                  Add comment
                </Button>
              )}
            </Row>
          )} */}
        </>
      )}
    </Container>
  );
};

export default SingleBook;

// const mapStateToProps = (state: Record<string, any>) => ({
//   currentBook: state.books.currentBook,
//   userId: state.auth.userId,
// });

// const mapDispatchToProps = (dispatch: any) => ({
//   onGetBook: (id: string) => dispatch(getBook(id)),
//   onSearchBook: (query: string, searchType: SearchType) =>
//     dispatch(searchBook(query, searchType)),
//   onUpdateRating: (id: string, rating: number, user: UserStar) =>
//     dispatch(updateRating(id, rating, user)),
//   onAddComment: (ownerId: string, comment: string) =>
//     dispatch(addComment(ownerId, comment)),
//   onEditBook: (book: Record<string, string>) =>
//     dispatch(editBook(book)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(SingleBook);
