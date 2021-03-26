import { FC, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { SortBy } from '../../types/bookshelf';
import './Filter.css';

type Props = {
  onSort: (sortBy: SortBy) => void;
};

const Filter: FC<Props> = ({ onSort }: Props) => {
  const [active, setActive] = useState<string>('title');

  const sortBooks = (sortBy: SortBy): void => {
    setActive(sortBy);
    onSort(sortBy);
  };

  return (
    <Nav className="w-100 justify-content-center filter" activeKey={active}>
      <p className="m-0 pt-2 pr-2">Sort by:</p>
      <Nav.Item>
        <Nav.Link onClick={() => sortBooks('title')} eventKey="title">
          Title
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => sortBooks('author')} eventKey="author">
          Author
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => sortBooks('rating')} eventKey="rating">
          Rating
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Filter;
