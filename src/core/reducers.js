import React from 'react';
import { combineReducers } from 'redux';
import LoginReducer from '../containers/Login/reducer';

export default combineReducers({
    session: LoginReducer
})
