import { AuthState, Reducer } from '../../types/auth';
import { AuthActionTypes as actionTypes } from '../actions/actionTypes';

const initialState: AuthState = {
  userId: null,
  error: null,
  users: [
    {
      userId: 'test-user',
      password: '12345',
    },
  ],
};

const login = (state: AuthState, userId: string, password: string) => {
  let newState = {};
  const userIndex = state.users.findIndex((el) => el.userId === userId);
  if (userIndex === -1) {
    newState = {
      error: 'Username or password is incorrect',
    };
  } else if (state.users[userIndex].password !== password) {
    newState = {
      error: 'Password is incorrect',
    };
  } else {
    // Side effect - this would go into Saga on real database use
    localStorage.setItem('bookShelfId', userId);
    newState = {
      userId,
      error: null,
    };
  }
  return { ...state, ...newState };
};

const logout = (state: AuthState) => {
  localStorage.removeItem('BookShelfId');
  const newState = {
    userId: null,
    error: null,
  };
  return { ...state, ...newState };
};

const resetError = (state: AuthState) => ({ ...state, error: null });

const checkId = (state: AuthState, tokenId: string) => {
  if (state.users.some((el) => el.userId === tokenId)) {
    return { ...state, userId: tokenId };
  }
  return state;
};

export default (
  state = initialState,
  {
    type,
    userId,
    password,
    tokenId,
  }: Reducer,
): AuthState => {
  switch (type) {
    case actionTypes.LOGIN:
      return login(state, userId, password);

    case actionTypes.LOGOUT:
      return logout(state);

    case actionTypes.RESET_ERROR:
      return resetError(state);

    case actionTypes.CHECK_ID:
      return checkId(state, tokenId);

    default:
      return state;
  }
};
