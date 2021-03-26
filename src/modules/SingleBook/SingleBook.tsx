import { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

import { getBook } from '../../store/actions/index';
import { BooksState } from '../../types/bookshelf';

type Props = {
  // currentBook: Book;
  onGetBook: (id: string) => void;
};

const SingleBook: FC<Props> = ({ onGetBook }: Props) => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    onGetBook(id);
  }, [id, onGetBook]);

  return (
    <Container>
      <Row>
        <h1>Something</h1>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state: BooksState) => ({
  currentBook: state.currentBook,
});

const mapDispatchToProps = (dispatch: any) => ({
  onGetBook: (id: string) => dispatch(getBook(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleBook);
