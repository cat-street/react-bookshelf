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
  const pages = [];

  for (let number = 1; number <= pageCount; number += 1) {
    pages.push(
      <Pagination.Item
        key={number}
        active={page === number}
        onClick={() => dispatch(setPage(number))}
      >
        {number}
      </Pagination.Item>,
    );
  }

  // const setPages = () => {
  //   const items = [];
  //   const currentBooks = searching ? searchResults : allBooks;
  //   const pageCount = Math.ceil(currentBooks.length / booksPerPage);
  //   if (pageCount === 1) return null;
  //   for (let number = 1; number <= pageCount; number += 1) {
  //     items.push(
  //       <Pagination.Item
  //         key={number}
  //         active={page === number}
  //         onClick={() => onSetPage(number)}
  //       >
  //         {number}
  //       </Pagination.Item>,
  //     );
  //   }
  //   return items;
  // };

  return (
    <Container fluid className="px-4">
      <Row>{/* <Filter onSort={onSortBooks} /> */}</Row>
      <Row>
        {currentBooks && currentBooks.map((el) =>
          <BookCard key={el.id} book={el} />)}
      </Row>
      <Row className="justify-content-center mb-3">
        {pageCount > 1 ? <Pagination>{pages}</Pagination> : null}
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
