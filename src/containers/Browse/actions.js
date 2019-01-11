export const selectBook = (bookId) => ({
    type: 'SELECT_BOOK',
    payload: bookId
})

export const clearSelected = () => ({
    type: 'CLEAR_SELECTED',
    payload: []
})
