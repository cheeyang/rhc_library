import React from "react";

const INITIAL_STATE = {
  bookIdsSelected: [],
  books: []
};

const BrowseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SELECT_BOOK":
      if (state.bookIdsSelected.includes(action.payload)) {
        //remove book if selected
        return {
          ...state,
          bookIdsSelected: state.bookIdsSelected.filter(
            id => id !== action.payload
          )
        };
      } else {
        //add book if not selected
        return {
          ...state,
          bookIdsSelected: [...state.bookIdsSelected, action.payload]
        };
      }
    case "CLEAR_SELECTED":
      return {
        ...state,
        bookIdsSelected: []
      };
    case "UPDATE_FETCHED_BOOKS":
      return {
        ...state,
        allBooks: action.payload,
        filteredBooks: action.payload
      };
    case "UPDATE_FILTERED_BOOKS":
      return {
        ...state,
        filteredBooks: action.payload
      };
    default:
      return state;
  }
};

export default BrowseReducer;
