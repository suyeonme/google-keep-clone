import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import { createStore } from 'redux';
import rootReducer from './store/reducers';
import { Provider } from 'react-redux';
import './index.css';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDom.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.querySelector('#root'),
);
