import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  onSearch,
  suggestions,
  onSelectSuggestion,
  showSuggestions,
  setShowSuggestions
}) => {
  return (
    <div className="text-center mb-10 relative">
      <h1 className="text-5xl font-bricolage mb-14 mt-12">How's the sky looking today?</h1>

      <div className="flex max-[375px]:flex max-[375px]:flex-col gap-4 max-w-xl mx-auto">
        
        {/* Input Box */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

          <input
            type="text"
            placeholder="Search for a place..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="w-full bg-[hsl(243,27%,20%)] text-white pl-12 pr-4 py-3 rounded-lg cursor-pointer focus:outline-offset-2"
          />

          {/* AUTOCOMPLETE DROPDOWN */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-[hsl(243,27%,20%)]  rounded-xl border border-gray-700 max-h-40 overflow-y-auto thin-scrollbar  shadow-xl z-50">

              {suggestions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => onSelectSuggestion(item)}
                  className="px-4 py-3 flex items-center gap-3 hover:bg-[hsl(243,23%,30%)] cursor-pointer"
                >
                  <img
                    src={`https://flagsapi.com/${item.country_code}/flat/32.png`}
                    className="w-6 h-6 rounded"
                  />
                  <span className="text-white">
                    {item.name}, {item.country}
                  </span>
                </div>
              ))}

            </div>
          )}
        </div>

        {/* Search Button */}
        <button
          onClick={onSearch}
          className="bg-blue-600 px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold cursor-pointer focus:outline-2 focus:outline-[hsl(248,70%,36%)] focus:outline-offset-[0.2rem]"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
