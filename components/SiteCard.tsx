import React, { useEffect, useState } from 'react';
import AddBookmarkModal from './AddBookmarkModal';

// Assuming '@/types' is the path to your types
import { Site } from '@/types';



const SiteCard: React.FC<Site> = ({ title, url, last=false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAddBookmarkWindow = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = async (site: Site) => {
    try {
      // Retrieve the current sites from storage, or default to an empty array if none exist.
      const storedSites = await storage.getItem('local:bookmarkedSites');
      const bookmarkedSites = storedSites ? JSON.parse(storedSites) : [];
  
      // Add the new site to the array of bookmarked sites.
      const updatedSites = [...bookmarkedSites, site];
  
      // Save the updated array back to storage.
      await storage.setItem('local:bookmarkedSites', JSON.stringify(updatedSites));
      
      // Close the modal.
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save the site:', error);
      // Handle any errors, possibly updating the UI to notify the user.
    }
  };

  const handleClick = () =>{
    last ? openAddBookmarkWindow() : window.open(url, '_blank').focus();
  }
  
  return (
    <>
      <div onClick={handleClick} className="rounded-xl z-20 site-card">
        {last ? (
          <>
            <img className="w-full bookmark-icon rounded-xl" src={url} alt="Add bookmark" />
            <p>{title}</p>
          </>
        ) : (
          <div className=" rounded-2xl" >
            <img className="bookmark-icon rounded-full" src={`https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(url)}`} alt="favicon" />
            <p className=' text-wrap'>{title}</p>
          </div>
        )}
      </div>
      <AddBookmarkModal isOpen={isModalOpen} onClose={handleClose} onSave={handleSave} />
    </>
  );
};

export default SiteCard;
