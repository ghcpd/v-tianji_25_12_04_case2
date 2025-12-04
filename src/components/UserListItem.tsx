import React from 'react';

interface UserListItemProps {
  userId: string;
  displayName: string;
  userEmail: string;
}

export const UserListItem: React.FC<UserListItemProps> = ({ userId, displayName, userEmail }) => {
  return (
    <li className="user-list-item" data-testid="user-list-item">
      <div className="item-content">
        <p className="identifier">Identifier: {userId}</p>
        <p className="name">Username: {displayName}</p>
        <p className="contact">Contact: {userEmail}</p>
      </div>
      <button aria-label="Select user">Select</button>
    </li>
  );
};

