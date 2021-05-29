import {
  Container, Pagination, Row, Spinner,
} from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { setPage } from '../../store/slices/bookSlice';

import BookCard from '../BookCard/BookCard';
import Filter from '../Filter/Filter';

const Books = () => {
  const initialBooks = useAppSelector((state) => state.books.initialBooks);
  const currentBooks = useAppSelector((state) => state.books.currentBooks);
  const page = useAppSelector((state) => state.books.page);
  const booksPerPage = useAppSelector((state) => state.books.booksPerPage);
  const loading = useAppSelector((state) => state.books.loading);
  const dispatch = useAppDispatch();

  const pageCount = Math.ceil(initialBooks.length / booksPerPage);
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <Container fluid className="px-4">
      {loading ? (
        <Row className="d-flex justify-content-center pt-5">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Row>
      ) : (
        <>
          <Row>
            <Filter page={page} />
          </Row>

          <Row>
            {currentBooks
              && currentBooks.map((el) => <BookCard key={el.id} book={el} />)}
          </Row>

          <Row className="justify-content-center mb-3">
            {pageCount > 1 ? (
              <Pagination>
                {pages.map((el) => (
                  <Pagination.Item
                    key={el}
                    active={page === el}
                    onClick={() => dispatch(setPage(el))}
                  >
                    {el}
                  </Pagination.Item>
                ))}
              </Pagination>
            ) : null}
          </Row>
        </>
      )}
    </Container>
  );
};

export default Books;
