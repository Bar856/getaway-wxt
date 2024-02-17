import React, { useCallback, useEffect, useState, useRef } from 'react'

import { SiteContainerProps } from '@/types';
import { Site, BookmarkNode } from '@/types';

import SiteCard from '@/components/SiteCard';

// component that renders sites containers by type (bookmarks or topSites)

const SitesContainer: React.FC<SiteContainerProps> = ({typeOfData}) => {
    
  const [sites, setSites] = useState<Site[]>([]);
  
  const onRejected = useCallback((error: Error) => {
    console.error(`An error occurred: ${error}`);
  }, []);
    
  // Function to fetch bookmarks
  const processBookmarks = useCallback((nodes: BookmarkNode[]) => {
      for (let node of nodes) {
        if (node.title === "Bookmarks Bar" || node.title === "Bookmarks Toolbar") {
            if (node.children) {
                const bookmarksBarItems: Site[] = node.children
                .filter(child => child.url) 
                .map(({ title, url }) => ({ title, url: url! }));
                setSites(bookmarksBarItems);
            }
            break; // Stop once the bookmarks bar folder is found
        } else if (node.children) {
            processBookmarks(node.children); // Recursively process children
        }
      }
  }, []);
  
  // Function to fetch top sites
  const fetchTopSites = useCallback(() => {
    browser.topSites.get().then(sites => {
      setSites(sites.map(({ title, url }) => ({ title, url })));
    }).catch(onRejected);
  }, [onRejected]);
    

  useEffect(() => {
    // watch for changes in bookmarks from storage
    const unWatchForStorageChanges = storage.watch<boolean>('local:bookmarkedSites', (newState, oldState) => {
      fetchAndProcessBookmarks()
    });
    // fetch bookmarks from storage and browser
    const fetchAndProcessBookmarks = async () => {
      try {
        const tree = await browser.bookmarks.getTree();
        processBookmarks(tree);
    
        const storedSitesJson = await storage.getItem('local:bookmarkedSites') as string | null || '[]';
        const sitesFromStorage = JSON.parse(storedSitesJson);
    
        setSites(prevSites => {
          // Combine the bookmarks fetched from the browser with the sites from local storage
          // and remove duplicates.
          const fetchedSites = typeOfData === 'Most Recent' ? [] : prevSites;
    
          // Create a map to remove duplicates, favoring sites from the fetched list.
          const siteMap = new Map();
          [...fetchedSites, ...sitesFromStorage].forEach(site => {
            siteMap.set(site.url, site);
          });
    
          // Convert the Map values back to an array.
          return Array.from(siteMap.values());
        });
      } catch (error) {
        onRejected(error);
      }
    };

    if (typeOfData === 'Most Recent') {
        fetchTopSites();
    } else {
        fetchAndProcessBookmarks();
    }

    return () => {
      unWatchForStorageChanges()
    }
  }, [typeOfData, fetchTopSites, processBookmarks, onRejected]);

  const scrollContainer = useRef(null);

  // Scroll the container by the width of the container
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const { scrollLeft, clientWidth } = scrollContainer.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollContainer.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className=' mt-2'>
      {/* Title */}
      <div className='flex flex-row justify-center'>
        {
          typeOfData === "Bookmarks" ? (
          <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6719 2.75961L14.5163 6.504L13.75 6.50495L13.6493 6.50834L13.5475 6.51518L13.4466 6.52542L13.2898 6.55231C12.2582 6.76694 11.5 7.67945 11.5 8.75495C11.5 9.92024 12.3858 10.8786 13.5209 10.9934L13.6771 11.0038L13.6493 11.0034L13.5475 11.0102L13.4466 11.0205L13.2898 11.0474C12.3125 11.2507 11.5806 12.0804 11.5062 13.0816L11.5 13.25L11.5052 13.404C11.5808 14.5216 12.4724 15.4154 13.589 15.4943L13.75 15.5L14 15.501L13.75 15.5015L13.6493 15.5049L13.5475 15.5117L13.4466 15.5219L13.2898 15.5488C12.3125 15.7522 11.5806 16.5818 11.5062 17.5831L11.5 17.7515L11.5052 17.9055C11.5241 18.1848 11.5939 18.4501 11.7055 18.6923L6.62564 21.3682C6.07517 21.6581 5.43135 21.1904 5.53701 20.5772L6.5684 14.5921L2.21602 10.3563C1.77015 9.92234 2.01606 9.16549 2.63184 9.07651L8.64275 8.20791L11.3263 2.75961C11.6012 2.20147 12.397 2.20147 12.6719 2.75961ZM21.25 17.0015C21.6642 17.0015 22 17.3373 22 17.7515C22 18.1312 21.7178 18.445 21.3518 18.4946L21.25 18.5015H13.75C13.3358 18.5015 13 18.1657 13 17.7515C13 17.3718 13.2822 17.058 13.6482 17.0083L13.75 17.0015H21.25ZM21.25 12.5C21.6642 12.5 22 12.8358 22 13.25C22 13.6297 21.7178 13.9435 21.3518 13.9932L21.25 14H13.75C13.3358 14 13 13.6642 13 13.25C13 12.8703 13.2822 12.5565 13.6482 12.5068L13.75 12.5H21.25ZM21.25 8.00495C21.6642 8.00495 22 8.34074 22 8.75495C22 9.13465 21.7178 9.44845 21.3518 9.49811L21.25 9.50495H13.75C13.3358 9.50495 13 9.16917 13 8.75495C13 8.37526 13.2822 8.06146 13.6482 8.0118L13.75 8.00495H21.25Z" fill="#212121"/>
          </svg>
          ) : (
            <svg width="50px" height="50px" viewBox="0 0 24 24" id="_24x24_On_Light_Recent" data-name="24x24/On Light/Recent" xmlns="http://www.w3.org/2000/svg">
              <rect id="view-box" width="24" height="24" fill="none"/>
              <path id="Shape" d="M9.682,18.75a.75.75,0,0,1,.75-.75,8.25,8.25,0,1,0-6.189-2.795V12.568a.75.75,0,0,1,1.5,0v4.243a.75.75,0,0,1-.751.75H.75a.75.75,0,0,1,0-1.5H3a9.75,9.75,0,1,1,7.433,3.44A.75.75,0,0,1,9.682,18.75Zm2.875-4.814L9.9,11.281a.754.754,0,0,1-.22-.531V5.55a.75.75,0,1,1,1.5,0v4.889l2.436,2.436a.75.75,0,1,1-1.061,1.06Z" transform="translate(1.568 2.25)" fill="#141124"/>
            </svg>
          )
        }
      </div>
      {/* Scrollable container */}
      <div className='relative flex items-center'>
        {/* Left icon */}
        <button 
          className='opacity-75 absolute left-0 z-10'
          onClick={() => scroll('left')} 
          aria-label='Scroll left'
        >
          <svg fill="#000000" width="50px" height="50px" viewBox="-8.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <title>left</title>
            <path d="M7.094 15.938l7.688 7.688-3.719 3.563-11.063-11.063 11.313-11.344 3.531 3.5z"></path>
          </svg>
        </button>
        {/* Sites */}
        <div 
          ref={scrollContainer} 
          className='no-scrollbar flex overflow-auto scroll-smooth whitespace-nowrap w-full'
        >
          {typeOfData === "Bookmarks" && (
            <div className='inline-block'>
              <SiteCard last={true} key={"last"} title={"Add"} url={"https://img.icons8.com/ios/50/plus-2-math.png"} />
            </div>
          )}
          {sites.map((site, index) => (
            <div className='inline-block' key={site.url || index}>
              <SiteCard title={site.title} url={site.url} />
            </div>
          ))}
        </div>
        {/* Right icon */}
        <button 
          className='absolute right-0 z-10'
          onClick={() => scroll('right')} 
          aria-label='Scroll right'
        >
          <svg className='' fill="#000000" width="50px" height="50px" viewBox="-8.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <title>right</title>
              <path d="M7.75 16.063l-7.688-7.688 3.719-3.594 11.063 11.094-11.344 11.313-3.5-3.469z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SitesContainer;