import React, { useEffect, useState } from 'react';

// Assuming '@/types' is the path to your types
import { Site } from '@/types';

// add bookmark modal
const AddBookmarkModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('https://');
  
  // reset everytime close or open
  useEffect(()=>{
    setUrl("https://")
    setTitle("")

  },[isOpen])

  if (!isOpen) return null;

  return (
    <div className=" z-40 backdrop-blur-sm bg-neutral-200 bg-opacity-20 fixed inset-0 flex items-center justify-center">
      <form className="rounded-lg  bg-neutral-200 bg-opacity-70 shadow-lg p-5 m-4 w-96 max-w-md flex-col flex">
        <input
          className="rounded-2xl w-full mb-4 p-2 border "
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="rounded-2xl w-full mb-4 p-2 border "
          type="url"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="flex justify-end">
          <button className="bg-neutral-200 text-black rounded-2xl hover:brightness-125 mr-2" onClick={onClose}>Cancel</button>
          <button type='submit' className='bg-neutral-200 text-black rounded-2xl hover:brightness-125' onClick={() => onSave({ title, url })}>Save</button>
        </div>
      </form>
    </div>
  );
};

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
            <img className="bookmark-icon rounded-full" src={`https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(url)}`} alt="favicon" />
            <p className=' text-wrap'>{title}</p>
          </div>
        )}
      </div>
      <AddBookmarkModal isOpen={isModalOpen} onClose={handleClose} onSave={handleSave} />
    </>
  );
};

export default SiteCard;
