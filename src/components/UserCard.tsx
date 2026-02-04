import React from 'react';
import { User } from '../types/user.refactored';

interface UserCardProps {
  user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="user-card" data-testid="user-card">
      <div className="user-card__header">
        <h3>User Details</h3>
      </div>
      <div className="user-card__body">
        <div className="user-card__field">
          <span className="user-card__label">User ID:</span>
          <span className="user-card__value">{user.userId}</span>
        </div>
        <div className="user-card__field">
          <span className="user-card__label">Name:</span>
          <span className="user-card__value">{user.userName}</span>
        </div>
        <div className="user-card__field">
          <span className="user-card__label">Email:</span>
          <span className="user-card__value">{user.userEmail}</span>
        </div>
      </div>
      <button aria-label="View user">View</button>
    </div>
  );
};

