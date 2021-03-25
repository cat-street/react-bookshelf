import { FC, SyntheticEvent, useState } from 'react';
import { connect } from 'react-redux';
import { Form, FormControl, Button } from 'react-bootstrap';
import { searchBook } from '../../store/actions/index';

type Props = {
  onSearchBook: (query: string) => void;
};

const Search: FC<Props> = ({ onSearchBook }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLInputElement;
    setSearchQuery(target.value);
  };

  const handleSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();
    onSearchBook(searchQuery);
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
  onSearchBook: (query: string) => dispatch(searchBook(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
