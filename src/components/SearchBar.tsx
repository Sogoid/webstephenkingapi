import React from 'react';
import {motion} from 'framer-motion';

interface SearchBarProps {
    isSearchFocused: boolean;
    searchValue: string;
    setSearchValue: (value: string) => void;
    setIsSearchFocused: (focused: boolean) => void;
    searchType: 'title' | 'publisher';
    setSearchType: (type: 'title' | 'publisher') => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
                                                 isSearchFocused,
                                                 searchValue,
                                                 setSearchValue,
                                                 setIsSearchFocused,
                                                 searchType,
                                                 setSearchType
                                             }) => {
    return (
        <div className="flex flex-col justify-center items-center mt-8">
            <motion.div
                animate={{scale: isSearchFocused || searchValue ? 1 : 0}}
                className={`font-custom transition-transform duration-300 text-gray-700 ${isSearchFocused || searchValue ? 'mb-0' : 'mb-0'}`}
            >
                Search...
            </motion.div>
            <div className="flex space-x-2"> {/* Container flexível para input e select */}
                <input
                    className={`w-96 border-2 rounded-md p-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        isSearchFocused || searchValue ? 'border-indigo-600' : 'border-gray-300'
                    }`}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="Digite sua pesquisa"
                />
                <select
                    value={searchType}
                    className="border-2 rounded-md p-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300"
                    onChange={(e) => setSearchType(e.target.value as 'title' | 'publisher')}
                >
                    <option value="title">TITULO</option>
                    <option value="publisher">EDITORA</option>
                </select>
            </div>
        </div>
    );
};

export default SearchBar;
