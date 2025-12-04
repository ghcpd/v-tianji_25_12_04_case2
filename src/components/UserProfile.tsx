import React from 'react';

interface UserProfileProps {
  userId: string;
  userName: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ userId, userName }) => {
  return (
    <div className="user-profile" data-testid="user-profile">
      <h2>User Information</h2>
      <div className="profile-section">
        <label htmlFor="user-id">User ID:</label>
        <span id="user-id">{userId}</span>
      </div>
      <div className="profile-section">
        <label htmlFor="user-name">Name:</label>
        <span id="user-name">{userName}</span>
      </div>
      <button aria-label="Edit profile">Edit</button>
    </div>
  );
};

