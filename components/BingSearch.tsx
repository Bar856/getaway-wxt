import { useState, ChangeEvent } from 'react';
import './BingSearch.css';

// component in charge of bing search futures

const BingSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: any) => {
        e.preventDefault();
        const bingSearchUrl = `https://www.bing.com/search?q=${encodeURIComponent(searchQuery)}`;
        window.open(bingSearchUrl, '_blank');
    };

    const setSearchFn = (e:ChangeEvent<HTMLInputElement>) =>{
        setSearchQuery(e.target.value)
    }
    return (
    <>
        <form className='bing-search-box' onSubmit={handleSearch}>
            <input
                type="text"
                value={searchQuery}
                onChange={setSearchFn}
                placeholder="Search Bing"
            />
            <button type="submit">Search</button>
        </form>
    </>
  )
}

export default BingSearch