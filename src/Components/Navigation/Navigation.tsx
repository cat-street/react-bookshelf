import { FC } from 'react';
import {
  Navbar,
  Nav,
  Container,
} from 'react-bootstrap';
import Search from '../Search/Search';

const Navigation: FC = () => (
  <Navbar bg="dark" expand="md" variant="dark" className="py-3" fixed="top">
    <Container>
      <Navbar.Brand href="/">React Bookshelf</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className=" justify-content-end"
      >
        <Nav className="pr-3">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
        <Search />
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Navigation;
