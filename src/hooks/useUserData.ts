import { useQuery } from '@tanstack/react-query';
import { User, ApiUserResponse, adaptApiUserToUser } from '../types/user.refactored';

export const useUserData = (userId: string) => {
  return useQuery<User>({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch user');
      const apiUser: ApiUserResponse = await response.json();
      return adaptApiUserToUser(apiUser);
    }
  });
};

