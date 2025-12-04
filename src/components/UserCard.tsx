import React from 'react';

interface UserCardProps {
  id: string;
  name: string;
  email: string;
}

export const UserCard: React.FC<UserCardProps> = ({ id, name, email }) => {
  return (
    <div className="user-card" data-testid="user-card">
      <div className="card-header">
        <h3>User Details</h3>
      </div>
      <div className="card-body">
        <div className="field">
          <span className="field-label">ID:</span>
          <span className="field-value">{id}</span>
        </div>
        <div className="field">
          <span className="field-label">Full Name:</span>
          <span className="field-value">{name}</span>
        </div>
        <div className="field">
          <span className="field-label">Email Address:</span>
          <span className="field-value">{email}</span>
        </div>
      </div>
      <button aria-label="View details">View</button>
    </div>
  );
};

