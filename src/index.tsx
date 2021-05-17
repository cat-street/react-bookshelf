import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import booksReducer from './store/reducers/books';
import authReducer from './store/reducers/auth';
import makeServer from './utils/mirage';

import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

if (process.env.NODE_ENV === 'development') {
  makeServer({ environment: 'development' });
}
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const rootReducer = combineReducers({
  books: booksReducer,
  auth: authReducer,
});

const composeEnhancers = process.env.NODE_ENV === 'development'
  ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose)
  : null || compose;
const store = createStore(rootReducer, composeEnhancers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
