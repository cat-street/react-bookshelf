enum BooksActionTypes {
  SET_BOOKS = 'SET_BOOKS',
  SORT_BOOKS = 'SORT_BOOKS',
  UPDATE_RATING = 'UPDATE_RATING',
  SEARCH_BOOK = 'SEARCH_BOOK',
  SET_PAGE = 'SET_PAGE',
  GET_BOOK = 'GET_BOOK',
  ADD_COMMENT = 'ADD_COMMENT',
  EDIT_BOOK = 'EDIT_BOOK',
}

enum AuthActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  RESET_ERROR = 'RESET_ERROR',
  CHECK_ID = 'CHECK_ID',
}

export { BooksActionTypes, AuthActionTypes };
