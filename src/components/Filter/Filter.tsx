import { Nav } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { setPage, sortBooks } from '../../store/store';
import { SortBy } from '../../types/books';
import './Filter.css';

type Props = {
  page: number;
};

const Filter = ({ page } : Props) => {
  const sortType = useAppSelector((state) => state.books.sort);
  const dispatch = useAppDispatch();

  const sortTypes: SortBy[] = ['title', 'author', 'rating'];

  const handleSort = (sortBy: SortBy) => {
    const order = sortBy === 'rating' ? 'desc' : 'asc';
    dispatch(sortBooks({ type: sortBy, order }));
    dispatch(setPage(page));
  };

  return (
    <Nav className="w-100 justify-content-center filter" activeKey={sortType}>
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
