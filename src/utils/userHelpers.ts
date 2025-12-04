export interface UserInfo {
  userId: string;
  userName: string;
  userEmail: string;
}

export const formatUserDisplay = (user: UserInfo): string => {
  return `${user.userName} (${user.userEmail})`;
};

export const validateUserIdentifier = (identifier: string): boolean => {
  return /^[A-Z0-9]{8,}$/.test(identifier);
};

