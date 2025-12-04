import React, { useState } from 'react';

export const UserForm: React.FC = () => {
  const [formData, setFormData] = useState({
    userIdentifier: '',
    fullName: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic
  };

  return (
    <form className="user-form" onSubmit={handleSubmit} data-testid="user-form">
      <div className="form-group">
        <label htmlFor="user-identifier">User Identifier</label>
        <input
          type="text"
          id="user-identifier"
          name="userIdentifier"
          value={formData.userIdentifier}
          onChange={(e) => setFormData({ ...formData, userIdentifier: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="full-name">Full Name</label>
        <input
          type="text"
          id="full-name"
          name="fullName"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <button type="submit" aria-label="Submit form">Submit</button>
    </form>
  );
};

