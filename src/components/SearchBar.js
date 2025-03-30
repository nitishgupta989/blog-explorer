import React, { useState, useEffect } from 'react';

function SearchBar({ onSearch, onFilterAuthor, currentAuthorFilter }) {
  const [searchInput, setSearchInput] = useState('');
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setAuthors(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch authors:", err);
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value);
  };

  const handleAuthorChange = (e) => {
    onFilterAuthor(e.target.value);
  };

  const handleClearFilters = () => {
    setSearchInput('');
    onSearch('');
    onFilterAuthor('');
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-3">Search & Filter</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by title or content..."
                value={searchInput}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          
          <div className="col-md-4">
            <select 
              className="form-select" 
              value={currentAuthorFilter}
              onChange={handleAuthorChange}
              aria-label="Filter by author"
            >
              <option value="">All Authors</option>
              {loading ? (
                <option disabled>Loading authors...</option>
              ) : (
                authors.map(author => (
                  <option key={author.id} value={author.name}>
                    {author.name}
                  </option>
                ))
              )}
            </select>
          </div>
          
          <div className="col-md-2">
            <button 
              className="btn btn-outline-secondary w-100" 
              onClick={handleClearFilters}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
