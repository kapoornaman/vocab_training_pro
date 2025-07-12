import React, { useState, useEffect } from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, onSearch]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");
    setIsActive(false);
  };

  return (
    <div className={`search-container ${isActive ? 'active' : ''}`}>
      <div className="search-wrapper">
        <div className="search-icon">🔍</div>
        <input
          type="text"
          placeholder="Search vocabulary..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          className="search-input"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="clear-button"
          >
            ✕
          </button>
        )}
      </div>
      {searchTerm && (
        <div className="search-results-indicator">
          <span>Searching for "{searchTerm}"</span>
        </div>
      )}
    </div>
  );
}

export default SearchBar; 