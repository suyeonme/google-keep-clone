import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

import { createStore } from 'redux';
import reducer from './store/reducers/notes';
import { Provider } from 'react-redux';

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);

