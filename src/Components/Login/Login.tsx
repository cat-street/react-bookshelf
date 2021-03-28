import { FC, SyntheticEvent, useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Form,
  Button,
  Col,
  Container,
  Toast,
} from 'react-bootstrap';

import { login } from '../../store/actions/index';
import { AuthState, User } from '../../types/auth';

type Props = {
  // loggedIn: boolean,
  error: string | null,
  onLogin: (userId: string, password: string) => void,
};

// eslint-disable-next-line arrow-body-style
const Login: FC<Props> = ({ error, onLogin }: Props) => {
  const [input, setInput] = useState<User>({
    userId: '',
    password: '',
  });

  const handleChange = (evt: SyntheticEvent) => {
    const { name, value } = evt.target as HTMLTextAreaElement;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();
    if (input.userId) {
      onLogin(input.userId, input.password);
    }
  };

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
        {error && (
          <Toast className="mx-auto">
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

const mapStateToProps = (state: Record<string, AuthState>) => ({
  loggedIn: state.auth.loggedIn,
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch: any) => ({
  onLogin: (userId: string, password: string) => dispatch(login(userId, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
