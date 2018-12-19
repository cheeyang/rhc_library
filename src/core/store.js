import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import Reducers from './reducers.js';

const reduxExt = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

//required so that compose(fn(),false) does not cause app to crash when remote debugging is disabled
const middleWare = (!!reduxExt) ? compose(applyMiddleware(thunk), reduxExt) : applyMiddleware(thunk);

export default createStore(
    Reducers,
    middleWare
);
