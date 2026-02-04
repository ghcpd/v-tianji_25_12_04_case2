/**
 * Canonical user model for the application
 */
export interface User {
  userId: string;
  userName: string;
  userEmail: string;
}

// Legacy aliases (deprecated) — keep during migration
export type UserId = string;
export type UserName = string;
export type UserEmail = string;
export type UserEntity = User;
export type UserRecord = User;

// API DTOs
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

