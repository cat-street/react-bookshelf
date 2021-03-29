import { FC } from 'react';
import {
  Navbar,
  Nav,
  Container,
  Button,
} from 'react-bootstrap';
import { BoxArrowRight } from 'react-bootstrap-icons';
import Search from '../Search/Search';

type Props = {
  userId: string | null;
  onLogout: () => void;
};

const Navigation: FC<Props> = ({ userId, onLogout }: Props) => (
  <Navbar bg="dark" expand="md" variant="dark" className="py-3" fixed="top">
    <Container>
      <Navbar.Brand href="/">React Bookshelf</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-end"
      >
        <Nav className="mr-0 mb-3 mr-md-4 mb-md-0">
          <Nav.Link href="/">Home</Nav.Link>
          {
            userId
              ? (
                <Button onClick={onLogout} variant="outline-info px-3">
                  {userId}
                  <BoxArrowRight className="ml-2" />
                </Button>
              ) : (<Nav.Link href="/login">Login</Nav.Link>)
          }
        </Nav>
        <Search />
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Navigation;
