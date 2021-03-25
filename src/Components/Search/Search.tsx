import { FC, SyntheticEvent, useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

// eslint-disable-next-line arrow-body-style
const Search: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLInputElement;
    setSearchQuery(target.value);
  };

  const handleSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();
    console.log(searchQuery);
  };

  return (
    <Form inline onSubmit={handleSubmit}>
      <FormControl
        type="text"
        placeholder="Author, Title"
        className="mr-sm-2"
        value={searchQuery}
        onChange={handleChange}
      />
      <Button
        variant="outline-info"
        className="mx-auto px-5 mt-1 mx-sm-0 mt-sm-0 px-sm-3"
      >
        Search
      </Button>
    </Form>
  );
};

export default Search;
