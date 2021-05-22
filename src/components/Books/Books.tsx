import { FC } from 'react';
import { connect } from 'react-redux';
import { Container, Pagination, Row } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { setPage } from '../../store/slices/bookSlice';

// import { sortBooks, setPage } from '../../store/actions/index';
import {
  BooksArray,
  BooksState,
  SortBy,
} from '../../types/books';
import BookCard from '../BookCard/BookCard';
import Filter from '../Filter/Filter';

// type Props = {
//   allBooks: BooksArray;
//   books: BooksArray;
//   searchResults: BooksArray;
//   page: number;
//   booksPerPage: number;
//   searching: boolean;
//   onSortBooks: (sortBy: SortBy) => void;
//   onSetPage: (page: number) => void;
// };

// const Books: FC<Props> = ({
//   allBooks,
//   books,
//   searchResults,
//   page,
//   booksPerPage,
//   searching,
//   onSortBooks,
//   onSetPage,
// }: Props) => {
const Books: FC = () => {
  const initialBooks = useAppSelector((state) => state.books.initialBooks);
  const currentBooks = useAppSelector((state) => state.books.currentBooks);
  const page = useAppSelector((state) => state.books.page);
  const booksPerPage = useAppSelector((state) => state.books.booksPerPage);
  const dispatch = useAppDispatch();

  const pageCount = Math.ceil(initialBooks.length / booksPerPage);
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <Container fluid className="px-4">
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
    </Container>
  );
};

export default Books;

// const mapStateToProps = (state: Record<string, BooksState>) => ({
//   allBooks: state.books.initialBooks,
//   books: state.books.currentBooks,
//   searchResults: state.books.searchResults,
//   page: state.books.page,
//   booksPerPage: state.books.booksPerPage,
//   searching: state.books.searching,
// });

// const mapDispatchToProps = (dispatch: any) => ({
//   onSortBooks: (sortBy: SortBy) => dispatch(sortBooks(sortBy)),
//   onSetPage: (page: number) => dispatch(setPage(page)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Books);
