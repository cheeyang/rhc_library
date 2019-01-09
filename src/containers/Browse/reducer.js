import React from 'react';

const INITIAL_STATE = {
    bookIdsSelected: [],
}

const BrowseReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SELECT_BOOK' :
            if (state.bookIdsSelected.includes(action.payload)) {
                //remove book if selected
                return {
                    ...state,
                    bookIdsSelected: state.bookIdsSelected.filter(id=> (id!==action.payload))
                }
            } else {
                //add book if not selected
                return {
                    ...state,
                    bookIdsSelected: [...state.bookIdsSelected, action.payload]
                }
            }
        default:
            return state;
    }
}

export default BrowseReducer;
