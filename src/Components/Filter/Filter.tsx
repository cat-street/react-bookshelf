import { FC } from 'react';
import { Nav } from 'react-bootstrap';
import './Filter.css';

const Filter: FC = () => (
  <Nav className="justify-content-center filter" activeKey="name">
    <p className="m-0 pt-2 pr-2">Sort by:</p>
    <Nav.Item>
      <Nav.Link eventKey="name">Name</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="author">Author</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="rating">Rating</Nav.Link>
    </Nav.Item>
  </Nav>
);

export default Filter;
