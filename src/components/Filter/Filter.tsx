import { FC, useState } from 'react';
import { Nav } from 'react-bootstrap';

import { useAppDispatch } from '../../hooks/storeHooks';
import { setPage, sortBooks } from '../../store/store';
import { SortBy } from '../../types/books';
import './Filter.css';

type Props = {
  page: number;
};

const Filter: FC<Props> = ({ page } : Props) => {
  const [active, setActive] = useState<string>('title');
  const dispatch = useAppDispatch();

  const sortTypes: SortBy[] = ['title', 'author', 'rating'];

  const handleSort = async (sortBy: SortBy) => {
    setActive(sortBy);
    const order = sortBy === 'rating' ? 'desc' : 'asc';
    await dispatch(sortBooks({ type: sortBy, order }));
    dispatch(setPage(page));
  };

  return (
    <Nav className="w-100 justify-content-center filter" activeKey={active}>
      <p className="m-0 pt-2 pr-2">Sort by:</p>
      {sortTypes.map((el) => (
        <Nav.Item key={el}>
          <Nav.Link onClick={() => handleSort(el)} eventKey={el}>
            {el}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default Filter;
