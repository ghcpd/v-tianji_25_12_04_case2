interface User {
  uid: string;
  username: string;
  email: string;
}

export const fetchUserById = async (uid: string): Promise<User> => {
  const response = await fetch(`/api/users/${uid}`);
  return response.json();
};

export const createUser = async (userData: {
  userIdentifier: string;
  displayName: string;
  contactEmail: string;
}): Promise<User> => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
};

