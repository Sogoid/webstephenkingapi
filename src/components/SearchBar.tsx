import { motion } from "framer-motion";
import React from "react";

interface SearchBarProps {
  isSearchFocused: boolean;
  searchValue: string;
  setSearchValue: (value: string) => void;
  setIsSearchFocused: (focused: boolean) => void;
  searchType: "title" | "publisher";
  setSearchType: (type: "title" | "publisher") => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  isSearchFocused,
  searchValue,
  setSearchValue,
  setIsSearchFocused,
  searchType,
  setSearchType,
}) => {
  return (
    <div className="flex flex-col justify-center items-center mt-6 relative">
      <motion.div
        animate={{ scale: isSearchFocused || searchValue ? 1 : 0 }}
        className={`font-custom transition-transform duration-300 text-gray-700 absolute sm:left-[25.5rem] lg:left-[43rem] ${
          isSearchFocused || searchValue
            ? "-top-4 uppercase bg-white z-10 rounded-xl p-1"
            : " transform"
        }`}>
        Search...
      </motion.div>
      <div className="flex space-x-2 relative">
        <input
          className={`w-96 border-2 rounded-md p-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            isSearchFocused || searchValue
              ? "border-indigo-600"
              : "border-gray-300"
          } placeholder:font-custom placeholder:uppercase focus:placeholder-transparent`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          placeholder="Search..."
        />
        <select
          title="SearchOption"
          value={searchType}
          className="border-2 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300 font-custom text-center"
          onChange={(e) =>
            setSearchType(e.target.value as "title" | "publisher")
          }>
          <option value="title" className="font-custom">
            TITULO
          </option>
          <option value="publisher" className="font-custom">
            EDITORA
          </option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
