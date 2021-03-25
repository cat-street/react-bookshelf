import { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import { fetchBooks, sortBookShelf } from '../../store/actions/index';
import { BooksArray } from '../../types/bookshelf';
import BookCard from '../../components/BookCard/BookCard';
import Filter from '../../components/Filter/Filter';

type Props = {
  books: BooksArray;
  onFetchBooks: () => void;
  onSortBooks: (sortBy: string) => void;
};

const BookShelf: FC<Props> = ({ books, onFetchBooks, onSortBooks }: Props) => {
  useEffect(() => {
    onFetchBooks();
  }, [onFetchBooks]);

  return (
    <Container fluid className="px-4">
      <Row>
        <Filter onSort={onSortBooks} />
      </Row>
      <Row>
        {books
          && books.map((el) => (
            <BookCard key={el.id} book={el} />
          ))}
      </Row>
    </Container>
  );
};

const mapStateToProps = (state: BooksArray) => ({
  books: state,
});

const mapDispatchToProps = (dispatch: any) => ({
  onFetchBooks: () => dispatch(fetchBooks()),
  onSortBooks: (sortBy: string) => dispatch(sortBookShelf(sortBy)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookShelf);
