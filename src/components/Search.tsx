import React from 'react'
import { useSearchTerm } from '../../utils/useSearchTerm'

interface SearchProps {
    onSearch: (term: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useSearchTerm();

    const handleSearch = () => {
        const trimmedTerm = searchTerm.trim();
        onSearch(trimmedTerm);
    };

    return (<div className='search-area'>
            <input
                type="text"
                placeholder='Search...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default Search;
