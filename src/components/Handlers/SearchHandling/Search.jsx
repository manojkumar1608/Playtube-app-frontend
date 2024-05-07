// components/Search.js

import React, { useState,useEffect, useRef } from 'react';
import { BiSearchAlt2 } from "react-icons/bi"
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Search = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [query, setQuery] = useState('');
    const navigate = useNavigate()
    const suggestionsRef = useRef(null)

    const handleChange = async (e) => {
        const value = e.target.value;
        delayedSearch(value)
    }
    const HandleSearch = async (value) => {
        if (value.trim() !== '') {
            try {
                const response = await axios.get(`/api/v1/videos/suggestions?query=${value}`);
                const data = response.data.data
                setSuggestions(data);
                
            } catch (err) {
                console.error(err);
            }
        } else {
            setSuggestions([]);
        }
        
    };
    useEffect(() => {
        // Add event listener to detect clicks on the document
        document.addEventListener('click', handleClickOutside);
        // Cleanup function to remove event listener
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Function to handle click outside the suggestions
    const handleClickOutside = (e) => {
        if (!suggestionsRef?.current?.contains(e.target)  && !e.target.closest('.search-input')) {
            setSuggestions([]);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Navigate to another page with search query as URL parameter
        navigate(`/search-results?q=${encodeURIComponent(query)}`);
    };

    const debounce = (func, delay) => {
        let timerId;
        return function (...args) {
            if (timerId) {
                clearTimeout(timerId);
            }
            timerId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };
        // Function to handle search with debounce
        const delayedSearch = debounce((value) => {
            setQuery(value);
            HandleSearch(value);
        }, 2000); 
    
    return (
        <div className='w-full '>
        <form onSubmit={handleSubmit} className='flex flex-row'>
             <input  type="text"
             onChange={handleChange}
              placeholder="Search..."
               className="search-input h-12 w-full border p-2 border-gray-500 rounded-2xl mr-2 " />
            <button type='submit'
            className="h-11 w-14  bg-gray-300 rounded-full ">
              <BiSearchAlt2 className='size-4 mx-auto' /></button>
        </form>
        { suggestions?.length > 0 &&
            <ul ref={suggestionsRef}  
            className='fixed z-50 bg-gray-800 w-[30rem] rounded-xl mt-1 px-3 py-3'>
                {suggestions.map(suggestion => (
                    <li onClick={() =>{ 
                        setSuggestions([])
                        navigate(`/search-results?q=${encodeURIComponent(suggestion.title)}`)}}
                    className='m-1 flex flex-row text-white font-semibold text-base cursor-pointer hover:bg-gray-600 h-8 rounded-xl'
                    key={suggestion._id}>
                    <BiSearchAlt2 className='size-5 mt-1 mr-2'/>
                        {suggestion.title}
                    </li>
                    ))}
                    </ul>
}
        </div>
    );
};

export default Search;
