import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import { getFirebase } from 'react-redux-firebase';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers';
import './index.css';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunk.withExtraArgument(getFirebase)];
const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(...middlewares)),
);

ReactDom.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.querySelector('#root'),
);

// import React from 'react';
// import ReactDom from 'react-dom';
// import App from './App';
// import { BrowserRouter as Router } from 'react-router-dom';

// import { createStore, compose, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
// import rootReducer from './store/reducers';
// import './index.css';

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

// ReactDom.render(
//   <Provider store={store}>
//     <Router>
//       <App />
//     </Router>
//   </Provider>,
//   document.querySelector('#root'),
// );
