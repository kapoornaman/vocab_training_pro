import React, { useState, useEffect } from 'react';

function SearchBar({ onSearch }) {
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchInput);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchInput, onSearch]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search vocabulary..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </div>
  );
}

export default SearchBar; 