import { AuthActionTypes as actionTypes } from './actionTypes';

export const login = (userId: string, password: string) => ({
  type: actionTypes.LOGIN,
  userId,
  password,
});

export const resetError = () => ({
  type: actionTypes.RESET_ERROR,
});

export const logout = () => ({
  type: actionTypes.LOGOUT,
});

export const checkId = (tokenId: string) => ({
  type: actionTypes.CHECK_ID,
  tokenId,
});
