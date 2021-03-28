import { AuthActionTypes as actionTypes } from './actionTypes';

export const login = (user: string, password: string) => ({
  type: actionTypes.LOGIN,
  user,
  password,
});

export const logout = () => ({
  type: logout,
});
