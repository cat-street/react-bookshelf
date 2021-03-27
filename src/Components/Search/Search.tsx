import { FC, SyntheticEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, FormControl, Button } from 'react-bootstrap';

import { searchBook } from '../../store/actions/index';
import { SearchType } from '../../types/bookShelf';

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
      <FormControl
        name="search"
        type="text"
        placeholder="Author, Title"
        className="mr-sm-2"
        value={searchQuery}
        onChange={handleChange}
      />
      <Button
        type="submit"
        variant="outline-info"
        className="mx-auto px-5 mt-1 mx-sm-0 mt-sm-0 px-sm-3"
      >
        Search
      </Button>
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
