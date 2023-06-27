import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SearchTextField = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  let navigate = useNavigate()
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("searchValue",searchValue)
      if(searchValue === ""){
        window.location.reload()
      }else {
        const response = await axios.get(`http://localhost:24000/movie/search/${searchValue}`);
      onSearch(response.data);

      console.log("searchArea:",response.data);
      }
    } catch (error) {
      console.error('Error performing search:', error);
    }
  };
  return (
    <form onSubmit={handleSearchSubmit} style={styles.searchForm}>
      <input
        type="text"
        placeholder="Search by letters..."
        value={searchValue}
        onChange={handleSearchChange}
        style={styles.searchInput}
      />
      <button type="submit" style={styles.searchButton}>Search</button>
    </form>
  )
}

const styles = {
  searchForm: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px',
  },
  searchInput: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    marginRight: '10px',
    width: '200px',
  },
  searchButton: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '4px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

export default SearchTextField