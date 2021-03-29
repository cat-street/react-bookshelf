import { FC, SyntheticEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Form, FormControl, Button, Col,
} from 'react-bootstrap';

import { searchBook } from '../../store/actions/index';
import { SearchType } from '../../types/books';

type Props = {
  onSearchBook: (query: string, searchType: SearchType) => void;
};

const Search: FC<Props> = ({ onSearchBook }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();

  const handleChange = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLInputElement;
    setSearchQuery(target.value);
  };

  const handleSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();
    onSearchBook(searchQuery, 'title');
    history.push('/');
  };

  return (
    <Form inline onSubmit={handleSubmit}>
      <Col xs={12} md={8} className="p-0 pb-2 pb-md-0">
        <FormControl
          name="search"
          type="text"
          placeholder="Author, Title"
          className="w-100"
          value={searchQuery}
          onChange={handleChange}
        />
      </Col>
      <Col xs={4} md={4} className="p-0 pl-md-2 mx-auto">
        <Button
          type="submit"
          variant="outline-info"
          className="m-0 w-100"
        >
          Search
        </Button>
      </Col>
    </Form>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => ({
  onSearchBook: (
    query: string, searchType: SearchType,
  ) => dispatch(searchBook(query, searchType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
