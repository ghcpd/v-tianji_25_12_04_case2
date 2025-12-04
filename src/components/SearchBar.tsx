import React, { useState } from 'react';

export const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="search-bar" data-testid="search-bar">
      <input
        type="text"
        placeholder="Search by user ID or name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search users"
      />
      <button aria-label="Perform search">Search</button>
    </div>
  );
};

