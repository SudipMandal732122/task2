import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery, onSearch, error }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bricolage mb-6 ">How's the sky looking today?</h1>
      <div className="flex max-[375px]:flex max-[375px]:flex-col gap-4 max-w-2xl mx-auto">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for a place..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            className="w-full bg-[hsl(243,27%,20%)] text-white pl-12 pr-4 py-3 rounded-lg focus:outline-offset-2 cursor-pointer"
          />
        </div>
        <div>
        <button 
          onClick={onSearch}
          className="bg-blue-600 px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold  max-[375px]:w-full cursor-pointer hover:outline-blue-400  hover:outline-2 hover:outline-offset-2 hover:outline-solid"
        >
          Search
        </button>
        </div>
      </div>
      
    </div>
  );
};

export default SearchBar;