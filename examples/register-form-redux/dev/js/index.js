import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers';
import App from './components/App';

//const logger = createLogger();
const store = createStore(reducer);
 //   allReducers,
 //   applyMiddleware(thunk, promise, logger)
//);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
