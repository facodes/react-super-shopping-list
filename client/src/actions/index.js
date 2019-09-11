import * as TYPES from './types';

export const addBook = (dispatch, book) => new Promise((resolve, reject) => {
  if (!book.title || !book.author) reject();
  else {
    dispatch({ type: TYPES.ADD_BOOK, book });
    resolve();
  }
});

export default { addBook };
