import { SyntheticEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Card,
  Form,
  Button,
  Col,
  Container,
  Toast,
} from 'react-bootstrap';

import { User } from '../../types/auth';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { login, resetError } from '../../store/store';

const Login = () => {
  const [input, setInput] = useState<User>({
    userId: '',
    password: '',
  });
  const [toast, showToast] = useState(false);
  const history = useHistory();
  const error = useAppSelector((state) => state.auth.error);
  const userId = useAppSelector((state) => state.auth.userId);
  const dispatch = useAppDispatch();

  const handleChange = (evt: SyntheticEvent) => {
    const { name, value } = evt.target as HTMLTextAreaElement;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();
    if (input.userId) {
      dispatch(login({ userId: input.userId, password: input.password }));
    }
  };

  const hideToast = () => {
    dispatch(resetError());
    showToast(false);
  };

  useEffect(() => {
    if (userId || localStorage.getItem('bookshelfId')) {
      history.push('/');
    }
  }, [history, userId]);

  useEffect(() => {
    if (error) showToast(true);
    return () => {
      showToast(false);
    };
  }, [error]);

  return (
    <Container>
      <Col md="8" lg="6" xl="5" className="mx-auto">
        <Card className="text-center my-3">
          <Card.Body>
            <Card.Title>Login</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUser">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="userId"
                  placeholder="test-user"
                  value={input.userId}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="12345"
                  value={input.password}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="info" type="submit" className="w-100">
                Sign In
              </Button>
            </Form>
          </Card.Body>
        </Card>
        {toast && (
          <Toast className="mx-auto" onClose={hideToast}>
            <Toast.Header className="bg-danger text-light">
              <strong className="mr-auto">Error!</strong>
            </Toast.Header>
            <Toast.Body>{error}</Toast.Body>
          </Toast>
        )}
      </Col>
    </Container>
  );
};

export default Login;
