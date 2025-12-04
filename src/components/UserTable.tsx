import React from 'react';

interface User {
  uid: string;
  username: string;
  emailAddress: string;
}

interface UserTableProps {
  users: User[];
}

export const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <table className="user-table" data-testid="user-table">
      <thead>
        <tr>
          <th>UID</th>
          <th>Username</th>
          <th>Email Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.uid}>
            <td>{user.uid}</td>
            <td>{user.username}</td>
            <td>{user.emailAddress}</td>
            <td>
              <button aria-label="Edit user">Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

