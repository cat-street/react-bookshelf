import { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import { setBooks } from './store/actions/index';
import BookShelf from './modules/BookShelf/BookShelf';
import Navigation from './components/Navigation/Navigation';
import SingleBook from './modules/SingleBook/SingleBook';
import './App.css';

type Props = {
  onSetBooks: () => void;
};

const App: FC<Props> = ({ onSetBooks }: Props) => {
  useEffect(() => {
    onSetBooks();
  }, [onSetBooks]);

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
  onSetBooks: () => dispatch(setBooks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
