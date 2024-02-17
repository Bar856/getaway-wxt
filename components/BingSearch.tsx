import { useState, ChangeEvent } from 'react';
import './BingSearch.css';

// component in charge of bing search futures

const BingSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    // Using encodeURIComponent ensures that the searchQuery is correctly 
    // encoded for inclusion in a URL, handling special characters that 
    // might otherwise break the URL or change its meaning.

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
        <form className='bing-search-box rounded-full' onSubmit={handleSearch}>
            <input
                type="text"
                value={searchQuery}
                onChange={setSearchFn}
                placeholder="Search"
            >
                
            </input>
            <button className='justify-end rounded-full' type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 50 50">
                    <path d="M 21 3 C 11.654545 3 4 10.654545 4 20 C 4 29.345455 11.654545 37 21 37 C 24.701287 37 28.127393 35.786719 30.927734 33.755859 L 44.085938 46.914062 L 46.914062 44.085938 L 33.875 31.046875 C 36.43682 28.068316 38 24.210207 38 20 C 38 10.654545 30.345455 3 21 3 z M 21 5 C 29.254545 5 36 11.745455 36 20 C 36 28.254545 29.254545 35 21 35 C 12.745455 35 6 28.254545 6 20 C 6 11.745455 12.745455 5 21 5 z"></path>
                </svg>
            </button>
        </form>
    </>
  )
}

export default BingSearch