import {
  Navbar, Nav, Container, Button,
} from 'react-bootstrap';
import { BoxArrowRight } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/storeHooks';
import { setInitialBooks, setPage, sortBooks } from '../../store/store';
import Search from '../Search/Search';

type Props = {
  userId: string | null;
  onLogout: () => void;
};

const Navigation = ({ userId, onLogout }: Props) => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleHomeClick = async () => {
    history.push('/');
    await dispatch(setInitialBooks());
    dispatch(sortBooks({ type: 'title', order: 'asc' }));
    dispatch(setPage(1));
  };

  return (
    <Navbar bg="dark" expand="md" variant="dark" className="py-3" fixed="top">
      <Container>
        <Navbar.Brand>React Bookshelf</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="mr-0 mb-3 mr-md-4 mb-md-0">
            <Nav.Link onClick={handleHomeClick}>Home</Nav.Link>
            {userId ? (
              <Button onClick={onLogout} variant="outline-info px-3">
                {userId}
                <BoxArrowRight className="ml-2" />
              </Button>
            ) : (
              <Nav.Link onClick={() => history.push('/login')}>Login</Nav.Link>
            )}
          </Nav>
          <Search />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
