import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import makeServer from './mock/mirage';

import store from './store/store';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

makeServer({ environment: 'development' });

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
