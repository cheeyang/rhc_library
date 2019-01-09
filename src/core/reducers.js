import React from 'react';
import { combineReducers } from 'redux';
import LoginReducer from 'containers/Login/reducer';
import BrowseReducer from 'containers/Browse/reducer';

export default combineReducers({
    session: LoginReducer,
    browse: BrowseReducer,
})
