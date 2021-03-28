enum BookShelfActionTypes {
  SET_BOOKS = 'SET_BOOKS',
  SORT_BOOKS = 'SORT_BOOKS',
  UPDATE_RATING = 'UPDATE_RATING',
  SEARCH_BOOK = 'SEARCH_BOOK',
  SET_PAGE = 'SET_PAGE',
  GET_BOOK = 'GET_BOOK',
  ADD_COMMENT = 'ADD_COMMENT',
}

enum AuthActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  RESET_ERROR = 'RESET_ERROR',
}

export { BookShelfActionTypes, AuthActionTypes };
