/**
 * Canonical user type - single source of truth for user data
 * All components and services should use this type
 */
export interface User {
  userId: string;
  userName: string;
  userEmail: string;
}

/**
 * Type aliases for backward compatibility during migration
 * @deprecated Use User instead
 */
export type UserEntity = User;
export type UserRecord = User;

/**
 * Legacy type mappings for API responses that use different naming
 * Use adaptApiUserToUser() to convert to canonical User type
 */
export interface ApiUserResponse {
  uid: string;
  username: string;
  email: string;
}

/**
 * Adapter function to convert API response to canonical User type
 */
export const adaptApiUserToUser = (apiUser: ApiUserResponse): User => ({
  userId: apiUser.uid,
  userName: apiUser.username,
  userEmail: apiUser.email
});

/**
 * Adapter function to convert canonical User type to API request format
 */
export const adaptUserToApiRequest = (user: User): ApiUserResponse => ({
  uid: user.userId,
  username: user.userName,
  email: user.userEmail
});

