import React, { useCallback, useEffect, useState } from 'react'

import { SiteContainerProps } from '@/types';
import { Site, BookmarkNode } from '@/types';

import SiteCard from '@/components/SiteCard';

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
        if (typeOfData === 'Most Recent') {
            fetchTopSites();
        } else {
            browser.bookmarks.getTree()
            .then(tree => processBookmarks(tree), onRejected);
        }
    }, [typeOfData, fetchTopSites, processBookmarks, onRejected]);

    return (
        <>
          <h2 className='text-left pt-10 pb-4'>{typeOfData}</h2>
          <div className='bookmarks-container'>
            {sites.map((site, index) => (
              <SiteCard key={site.url || index} title={site.title} url={site.url} />
            ))}
          </div>
        </>
    );
}

export default SitesContainer;