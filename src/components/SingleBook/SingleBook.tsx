import { useEffect, useState } from 'react';
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

import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import {
  addComment,
  clearBook,
  editBook,
  getBook,
  searchBooks,
  setPage,
  setRating,
  sortBooks,
} from '../../store/store';

import BookRating from '../BookRating/BookRating';
import CommentForm from '../CommentForm/CommentForm';
import CommentCard from '../CommentCard/CommentCard';
import EditBookModal from '../EditBookModal/EditBookModal';

import { Book } from '../../types/books';

const SingleBook = () => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const currentBook = useAppSelector((state) => state.books.openedBook);
  const loading = useAppSelector((state) => state.books.loading);
  const userId = useAppSelector((state) => state.auth.userId);
  const dispatch = useAppDispatch();

  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const searchByAuthor = async () => {
    await dispatch(searchBooks({ query: currentBook!.author, where: 'author' }));
    dispatch(sortBooks({ type: 'title', order: 'asc' }));
    dispatch(setPage(1));
    history.push('/');
  };

  const handleUpdateRating = (vote: Record<string, number>) => {
    dispatch(setRating({ id, vote }));
  };

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleEdit = (fields: Record<string, string>) => {
    dispatch(editBook({ id, fields }));
  };

  const handleAddCommentClick = () => {
    setCommentOpen(true);
  };

  const handleAddComment = (text: string) => {
    if (userId) {
      dispatch(addComment({ id, ownerId: userId, text }));
      setCommentOpen(false);
    }
  };

  const hideModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(getBook(id));
    return () => {
      dispatch(clearBook());
    };
  }, [dispatch, id]);

  return (
    <Container className="p-4 pt-5">
      {showModal && (
        <EditBookModal
          book={currentBook as Book}
          onHide={hideModal}
          onEdit={handleEdit}
        />
      )}
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
                alt={currentBook.title}
              />
            </Col>
            <Col>
              <h2>
                <span className="mr-3">{currentBook.title}</span>
                <Badge variant="info" className="mr-3">
                  {currentBook.category || 'Uncategorized'}
                </Badge>
                {userId && userId === currentBook.ownerId ? (
                  <Button
                    size="sm"
                    variant="outline-success"
                    onClick={handleEditClick}
                  >
                    Edit
                  </Button>
                ) : null}
              </h2>
              <h3 className="text-muted">
                <Button
                  variant="link"
                  type="button"
                  size="lg"
                  className="p-0 m-0 mb-2"
                  onClick={searchByAuthor}
                >
                  {currentBook.author}
                </Button>
              </h3>
              <BookRating
                userId="test-user"
                rating={currentBook.rating}
                votes={Object.keys(currentBook.votes).length}
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
          {userId && (
            <Row>
              {commentOpen ? (
                <CommentForm onAdd={handleAddComment} />
              ) : (
                <Button
                  variant="outline-success"
                  className="mx-auto px-5"
                  onClick={handleAddCommentClick}
                >
                  Add comment
                </Button>
              )}
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

export default SingleBook;
