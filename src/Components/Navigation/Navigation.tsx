import { FC } from 'react';
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
} from 'react-bootstrap';

const Navigation: FC = () => (
  <Navbar bg="dark" expand="md" variant="dark" className="py-3" fixed="top">
    <Container>
      <Navbar.Brand href="#home">React Bookshelf</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className=" justify-content-end"
      >
        <Nav className="pr-3">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Login</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Author, Title"
            className="mr-sm-2"
          />
          <Button
            variant="outline-info"
            className="mx-auto px-5 mt-1 mx-sm-0 mt-sm-0 px-sm-3"
          >
            Search
          </Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Navigation;
