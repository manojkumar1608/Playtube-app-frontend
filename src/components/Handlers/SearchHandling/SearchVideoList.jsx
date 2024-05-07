import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import VideoCard from '../VideoHandler/VideoCard';
const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  
  useEffect(() => {
    // Fetch search results based on the query parameter from the URL
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    console.log(location.search);

    // Example API call to fetch search results based on the query
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`/api/v1/videos/search?query=${query}`);
        console.log(response)
        const data = response.data.data
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [location.search]);

  return (
    <div>
      <h1>Search Results</h1>
      <ul className='flex flex-wrap'>
        {searchResults.map(result => (
         <div className=''
          key={`video-${result._id}`}>
         <VideoCard  {...result} />
     </div>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
