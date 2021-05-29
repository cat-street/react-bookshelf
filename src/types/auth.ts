export type User = { userId: string, password: string };

export type UserData = { id: string, userId: string };

export type AuthError = { message: string };

export interface AuthState {
  userId: string | null,
  error: string | null,
}
