export const selectBook = bookId => ({
  type: "SELECT_BOOK",
  payload: bookId
});

export const clearSelected = () => ({
  type: "CLEAR_SELECTED",
  payload: []
});

export const updateFetchedBooks = books => ({
  type: "UPDATE_FETCHED_BOOKS",
  payload: books
});

export const updateFilteredBooks = books => ({
  type: "UPDATE_FILTERED_BOOKS",
  payload: books
});
