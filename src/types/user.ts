/**
 * Canonical User type used throughout the codebase
 */
export interface User {
  userId: string;
  userName: string;
  userEmail: string;
}

// Backwards compatible aliases (deprecated - prefer User)
export type UserEntity = User;
export type UserRecord = User;

// API boundary types and adapters can be added here if needed
export interface ApiUserResponse {
  uid: string;
  username: string;
  email: string;
}

export const adaptApiUserToUser = (apiUser: ApiUserResponse): User => ({
  userId: apiUser.uid,
  userName: apiUser.username,
  userEmail: apiUser.email
});

export const adaptUserToApiRequest = (user: User): ApiUserResponse => ({
  uid: user.userId,
  username: user.userName,
  email: user.userEmail
});

