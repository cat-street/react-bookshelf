import { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import BookCard from '../../components/BookCard/BookCard';
import { fetchBooks } from '../../store/actions/index';
import { Book } from '../../types/bookshelf';
import Filter from '../../components/Filter/Filter';

type Props = {
  books: Array<Book>;
  onFetchBooks: () => void;
};

const BookShelf: FC<Props> = ({ books, onFetchBooks }: Props) => {
  useEffect(() => {
    onFetchBooks();
  }, [onFetchBooks]);

  return (
    <Container fluid className="px-4">
      <Row>
        <Filter />
      </Row>
      <Row>
        {books && books.map((el) => <BookCard key={el.id} book={el} />)}
      </Row>
    </Container>
  );
};

const mapStateToProps = (state: Array<Book>) => ({
  books: state,
});

const mapDispatchToProps = (dispatch: any) => ({
  onFetchBooks: () => dispatch(fetchBooks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookShelf);
