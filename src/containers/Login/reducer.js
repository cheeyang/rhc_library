import React from 'react';

const INITIAL_STATE = {
    isLoggedIn: false,
    isAdmin: false,
    userEmail: '',
}

const LoginReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            return {
                ...state,
                isLoggedIn: true,
                isAdmin: action.payload.isAdmin || false,
                userEmail: action.payload.email || '',
            }
        default:
            return state;
    }
}

export default LoginReducer;
