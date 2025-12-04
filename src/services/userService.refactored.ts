import { User, ApiUserResponse, adaptApiUserToUser, adaptUserToApiRequest } from '../types/user';

/**
 * Fetches a user by ID from the API
 * @param userId - The user's identifier
 * @returns Promise resolving to a User object
 */
export const fetchUserById = async (userId: string): Promise<User> => {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.statusText}`);
  }
  const apiUser: ApiUserResponse = await response.json();
  return adaptApiUserToUser(apiUser);
};

/**
 * Creates a new user via the API
 * @param user - The user data to create
 * @returns Promise resolving to the created User object
 */
export const createUser = async (user: User): Promise<User> => {
  const apiPayload = adaptUserToApiRequest(user);

  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(apiPayload)
  });

  if (!response.ok) {
    throw new Error(`Failed to create user: ${response.statusText}`);
  }

  const apiUser: ApiUserResponse = await response.json();
  return adaptApiUserToUser(apiUser);
};

/**
 * Updates an existing user via the API
 * @param user - The user data to update
 * @returns Promise resolving to the updated User object
 */
export const updateUser = async (user: User): Promise<User> => {
  const apiPayload = adaptUserToApiRequest(user);

  const response = await fetch(`/api/users/${user.userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(apiPayload)
  });

  if (!response.ok) {
    throw new Error(`Failed to update user: ${response.statusText}`);
  }

  const apiUser: ApiUserResponse = await response.json();
  return adaptApiUserToUser(apiUser);
};

