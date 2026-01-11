import React from 'react';
import { User } from '../types/user.refactored';

interface UserTableProps {
  users: User[];
}

export const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <table className="user-table" data-testid="user-table">
      <thead>
        <tr>
          <th>User ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.userId}>
            <td>{user.userId}</td>
            <td>{user.userName}</td>
            <td>{user.userEmail}</td>
            <td>
              <button aria-label="Edit user">Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

