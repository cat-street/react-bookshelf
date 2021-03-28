import {
  FC, SyntheticEvent, useEffect, useState,
} from 'react';
import {
  Modal, Button, Form, Col, Row,
} from 'react-bootstrap';
import { Book } from '../../types/bookShelf';

type Props = {
  book: Book;
  onHide: () => void,
};

const EditBookModal: FC<Props> = ({ book, onHide }: Props) => {
  const [currentBook, setCurrentBook] = useState({
    title: '',
    author: '',
    cover: '',
    category: '',
    description: '',
    published: '',
  });

  const handleChange = (evt: SyntheticEvent) => {
    const { name, value } = evt.target as (HTMLInputElement | HTMLTextAreaElement);
    setCurrentBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  useEffect(() => {
    setCurrentBook(book);
  }, [book]);

  return (
    <Modal
      show
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="book-title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              type="text"
              value={currentBook.title || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Row>
            <Form.Group controlId="book-author" as={Col} xs={12} md={6}>
              <Form.Label>Author</Form.Label>
              <Form.Control
                name="author"
                type="text"
                value={currentBook.author || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="book-category" as={Col} xs={12} md={6}>
              <Form.Label>Category</Form.Label>
              <Form.Control
                name="category"
                type="text"
                value={currentBook.category || ''}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Form.Group controlId="book-description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              rows={4}
              value={currentBook.description || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="book-published">
            <Form.Label>Published</Form.Label>
            <Form.Control
              name="published"
              type="text"
              value={currentBook.published || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="book-cover">
            <Form.Label>Cover URL</Form.Label>
            <Form.Control
              name="published"
              type="url"
              value={currentBook.cover || ''}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="info">Submit</Button>
        <Button variant="danger" onClick={onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditBookModal;
