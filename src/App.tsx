import { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './hooks/storeHooks';
import {
  checkUser,
  logout,
  setInitialBooks,
  setPage,
  sortBooks,
} from './store/store';

import Books from './components/Books/Books';
import Navigation from './components/Navigation/Navigation';
import SingleBook from './components/SingleBook/SingleBook';
import Login from './components/Login/Login';

import './App.css';

function App() {
  const userId = useAppSelector((state) => state.auth.userId);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const setBooks = async () => {
      await dispatch(setInitialBooks());
      dispatch(sortBooks({ type: 'title', order: 'asc' }));
      dispatch(setPage(1));
    };
    setBooks();
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem('bookshelfId');
    if (token) dispatch(checkUser(token));
  }, [dispatch]);

  return (
    <div className="app">
      <Navigation userId={userId} onLogout={handleLogout} />
      <main>
        <Switch>
          <Route path="/:genre/:id" component={SingleBook} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Books} />
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
