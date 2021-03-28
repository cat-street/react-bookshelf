import { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import { checkId, logout, setBooks } from './store/actions/index';
import BookShelf from './components/BookShelf/BookShelf';
import Navigation from './components/Navigation/Navigation';
import SingleBook from './components/SingleBook/SingleBook';
import Login from './components/Login/Login';
import './App.css';
import { AuthState } from './types/auth';

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
    onSetBooks();
  }, [onSetBooks]);

  useEffect(() => {
    const token = localStorage.getItem('bookShelfId');
    if (token) onCheckId(token);
  }, [onCheckId]);

  return (
    <div className="app">
      <Navigation userId={userId} onLogout={handleLogout} />
      <Switch>
        <Route path="/:genre/:id" component={SingleBook} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={BookShelf} />
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
