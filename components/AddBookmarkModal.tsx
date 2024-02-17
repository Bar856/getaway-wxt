import React, {useEffect, useState} from 'react'

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

export default AddBookmarkModal;