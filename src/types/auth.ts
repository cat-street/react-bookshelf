export type User = { userId: string, password: string };

export interface AuthState {
  userId: string | null,
  error: string | null,
  users: User[],
}

export interface Reducer {
  type: string,
  userId: string,
  password: string,
  tokenId: string,
}
