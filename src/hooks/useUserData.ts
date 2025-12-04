import { useQuery } from '@tanstack/react-query';
import { User } from '../types/user.refactored';
import { fetchUserById } from '../services/userService';

/**
 * useUserData — typed to the canonical `User` shape and delegating to
 * services/userService so logic and adapters are centralized.
 */
export const useUserData = (userId: string) => {
  return useQuery<User>({
    queryKey: ['user', userId],
    queryFn: async () => {
      // use the service to ensure any Adapter/transformations are applied
      return fetchUserById(userId);
    }
  });
};

