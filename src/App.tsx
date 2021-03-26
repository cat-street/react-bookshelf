import { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import { fetchBooks } from './store/actions/index';
import BookShelf from './modules/BookShelf/BookShelf';
import Navigation from './components/Navigation/Navigation';
import SingleBook from './modules/SingleBook/SingleBook';
import './App.css';

type Props = {
  onFetchBooks: () => void;
};

const App: FC<Props> = ({ onFetchBooks }: Props) => {
  useEffect(() => {
    onFetchBooks();
  }, [onFetchBooks]);

  return (
    <div className="app">
      <Navigation />
      <Switch>
        <Route path="/:genre/:id" component={SingleBook} />
        <Route exact path="/" component={BookShelf} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => ({
  onFetchBooks: () => dispatch(fetchBooks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
