import React, { useState } from 'react';

export const UserForm: React.FC = () => {
  const [formData, setFormData] = useState({
    userId: '',
    userName: '',
    userEmail: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic
  };

  return (
    <form className="user-form" onSubmit={handleSubmit} data-testid="user-form">
      <div className="form-group">
        <label htmlFor="user-id">User ID</label>
        <input
          type="text"
          id="user-id"
          name="userId"
          value={formData.userId}
          onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="user-name">Name</label>
        <input
          type="text"
          id="user-name"
          name="userName"
          value={formData.userName}
          onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="user-email">Email</label>
        <input
          type="email"
          id="user-email"
          name="userEmail"
          value={formData.userEmail}
          onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
        />
      </div>
      <button type="submit" aria-label="Submit form">Submit</button>
    </form>
  );
};

