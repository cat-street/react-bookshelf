import { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Pagination, Row } from 'react-bootstrap';

import { fetchBooks, sortBookShelf } from '../../store/actions/index';
import { BooksArray, BooksState } from '../../types/bookshelf';
import BookCard from '../../components/BookCard/BookCard';
import Filter from '../../components/Filter/Filter';

type Props = {
  allBooks: BooksArray;
  books: BooksArray;
  page: number;
  booksPerPage: number;
  onFetchBooks: () => void;
  onSortBooks: (sortBy: string) => void;
};

const BookShelf: FC<Props> = ({
  allBooks,
  books,
  page,
  booksPerPage,
  onFetchBooks,
  onSortBooks,
}: Props) => {
  const setPages = () => {
    const items = [];
    const pageCount = Math.ceil(allBooks.length / booksPerPage);
    for (let number = 1; number <= pageCount; number += 1) {
      items.push(
        <Pagination.Item key={number} active={page === number}>
          {number}
        </Pagination.Item>,
      );
    }
    return items;
  };

  useEffect(() => {
    onFetchBooks();
  }, [onFetchBooks]);

  return (
    <Container fluid className="px-4">
      <Row>
        <Filter onSort={onSortBooks} />
      </Row>
      <Row>
        {books && books.map((el) => <BookCard key={el.id} book={el} />)}
      </Row>
      <Row className="justify-content-center">
        <Pagination>{setPages()}</Pagination>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state: BooksState) => ({
  allBooks: state.initialBooks,
  books: state.currentBooks,
  page: state.page,
  booksPerPage: state.booksPerPage,
});

const mapDispatchToProps = (dispatch: any) => ({
  onFetchBooks: () => dispatch(fetchBooks()),
  onSortBooks: (sortBy: string) => dispatch(sortBookShelf(sortBy)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookShelf);
