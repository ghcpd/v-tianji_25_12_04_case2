import React, { useState } from 'react';
import { User } from '../types/user.refactored';

interface UserFormProps {
  onSubmit?: (user: User) => void;
  initialUser?: Partial<User>;
}

export const UserForm: React.FC<UserFormProps> = ({ onSubmit, initialUser }) => {
  const [formData, setFormData] = useState<Partial<User>>({
    userId: initialUser?.userId || '',
    userName: initialUser?.userName || '',
    userEmail: initialUser?.userEmail || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.userId && formData.userName && formData.userEmail) {
      onSubmit?.(formData as User);
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit} data-testid="user-form">
      <div className="user-form__group">
        <label htmlFor="user-id" className="user-form__label">User ID:</label>
        <input
          type="text"
          id="user-id"
          name="userId"
          className="user-form__input"
          value={formData.userId || ''}
          onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
          required
        />
      </div>
      <div className="user-form__group">
        <label htmlFor="user-name" className="user-form__label">Name:</label>
        <input
          type="text"
          id="user-name"
          name="userName"
          className="user-form__input"
          value={formData.userName || ''}
          onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
          required
        />
      </div>
      <div className="user-form__group">
        <label htmlFor="user-email" className="user-form__label">Email:</label>
        <input
          type="email"
          id="user-email"
          name="userEmail"
          className="user-form__input"
          value={formData.userEmail || ''}
          onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
          required
        />
      </div>
      <button type="submit" className="user-form__submit" aria-label="Submit user form">
        Submit
      </button>
    </form>
  );
};

