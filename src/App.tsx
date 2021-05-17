import { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import { checkId, logout, setBooks } from './store/actions/index';
import Books from './components/Books/Books';
import Navigation from './components/Navigation/Navigation';
import SingleBook from './components/SingleBook/SingleBook';
import Login from './components/Login/Login';
import { AuthState } from './types/auth';

import './App.css';

type Props = {
  userId: string | null;
  onSetBooks: () => void;
  onCheckId: (tokenId: string) => void;
  onLogout: () => void;
};

const App: FC<Props> = ({
  userId, onSetBooks, onCheckId, onLogout,
}: Props) => {
  const handleLogout = () => {
    onLogout();
  };

  useEffect(() => {
    fetch('/api/books?sorting=title')
      .then((response) => response.json())
      .then((json) => console.log(json));
  }, []);

  useEffect(() => {
    onSetBooks();
  }, [onSetBooks]);

  useEffect(() => {
    const token = localStorage.getItem('bookshelfId');
    if (token) onCheckId(token);
  }, [onCheckId]);

  return (
    <div className="app">
      <Navigation userId={userId} onLogout={handleLogout} />
      <Switch>
        <Route path="/:genre/:id" component={SingleBook} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Books} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state: Record<string, AuthState>) => ({
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch: any) => ({
  onSetBooks: () => dispatch(setBooks()),
  onCheckId: (tokenId: string) => dispatch(checkId(tokenId)),
  onLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
