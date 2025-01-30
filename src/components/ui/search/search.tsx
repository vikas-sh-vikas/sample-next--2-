import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

type SearchProps = {
  searchText: string;
  onInputChange?: (searchText: string) => void;
};

const Search: React.FC<SearchProps> = ({ searchText, onInputChange }) => {
  const [isInputFocused, setInputFocused] = useState(false);

  const handleInputChange = (searchtext: string) => {
    if (searchtext.length <= 15) {
      onInputChange?.(searchtext);
    }
  };

  const handleClearClick = () => {
    onInputChange?.("");
  };

  return (
    <div className="relative">
      <input
        className="border border-gray-300 rounded-md text-sm w-11/12 p-1.5 text-left focus:outline-none"
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
      />
      {searchText.length > 0 && (
        <div
          className="absolute top-1/2 right-3 cursor-pointer text-gray-600 transform -translate-y-1/2"
          onClick={handleClearClick}
        >
          <FaTimes className="text-lg" />
        </div>
      )}
    </div>
  );
};

export default Search;
