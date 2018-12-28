import React from 'react';

const INITIAL_STATE = {
    user: null,
}

const LoginReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

export default LoginReducer;
