import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import { useAppDispatch } from './hooks/storeHooks';
import { setInitialBooks, setPage, sortBooks } from './store/store';

// import { checkId, logout, setBooks } from './store/actions/index';
import Books from './components/Books/Books';
import Navigation from './components/Navigation/Navigation';
import SingleBook from './components/SingleBook/SingleBook';
import Login from './components/Login/Login';
import { AuthState } from './types/auth';

import './App.css';

// type Props = {
//   userId: string | null;
//   onSetBooks: () => void;
//   onCheckId: (tokenId: string) => void;
//   onLogout: () => void;
// };

// const App: FC<Props> = ({
//   userId, onSetBooks, onCheckId, onLogout,
// }: Props) => {
function App() {
  const dispatch = useAppDispatch();

  // const handleLogout = () => {
  //   onLogout();
  // };

  useEffect(() => {
    const setBooks = async () => {
      await dispatch(setInitialBooks());
      dispatch(sortBooks({ type: 'title', order: 'asc' }));
      dispatch(setPage(1));
    };
    setBooks();
  }, [dispatch]);

  // useEffect(() => {
  //   onSetBooks();
  // }, [onSetBooks]);

  // useEffect(() => {
  //   const token = localStorage.getItem('bookshelfId');
  //   if (token) onCheckId(token);
  // }, [onCheckId]);

  return (
    <div className="app">
      {/* <Navigation userId={userId} onLogout={handleLogout} /> */}
      <Navigation userId={null} onLogout={() => {}} />
      <Switch>
        <Route path="/:genre/:id" component={SingleBook} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Books} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;

// const mapStateToProps = (state: Record<string, AuthState>) => ({
//   userId: state.auth.userId,
// });

// const mapDispatchToProps = (dispatch: any) => ({
//   onSetBooks: () => dispatch(setBooks()),
//   onCheckId: (tokenId: string) => dispatch(checkId(tokenId)),
//   onLogout: () => dispatch(logout()),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(App);
