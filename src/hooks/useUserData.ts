import { useQuery } from '@tanstack/react-query';

interface UserData {
  id: string;
  name: string;
  email: string;
}

export const useUserData = (userId: string) => {
  return useQuery<UserData>({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}`);
      return response.json();
    }
  });
};

