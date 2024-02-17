import { ChangeEvent, useState, useEffect } from 'react';
import loadingGif from '@/assets/loading.gif';

import './App.css';
import ToggleSwitch from '@/components/ToggleSwitch';

// component that renders popup window 
function App() {
  const [showFlights, setShowFlights] = useState<any>(true)
  const [showHotels, setShowHotels] = useState<any>(true)
  const [loading, setLoading] = useState<boolean>(true)

  // check settings from local storage before opening the windows in order to create responsive UI
  useEffect(() => {
    const checkSettingsFromPopup = async() =>{
      setShowFlights(await storage.getItem('local:showFlights'))
      setShowHotels(await storage.getItem('local:showHotels'))
      setLoading(false)
    }
    checkSettingsFromPopup()

  }, [])

  // functions that sets local storage according to user needs
  const toggleFlights = (event: ChangeEvent<HTMLInputElement>) => {
    const boolRes =  event.target.checked
    setShowFlights(boolRes); 
    browser.storage.local.set({ showFlights: boolRes });
  }
  const toggleHotels = (event: ChangeEvent<HTMLInputElement>) => {
    const boolRes =  event.target.checked
    setShowHotels(boolRes); 
    browser.storage.local.set({ showHotels: boolRes });
  }
  // loading GIF
  if (loading){
    return <img src={loadingGif} className="w-auto" alt="Loading" />
  }
  
  return (
    <>
      <div >
        <h2 className='text-4xl mb-16'>
          <span className="text-blue-500">G</span> 
          <span className="text-red-500">e</span> 
          <span className="text-yellow-500">t</span> 
          <span className="text-blue-500">a</span> 
          <span className="text-green-500">w</span> 
          <span className="text-red-500">a</span> 
          <span className="text-blue-300">y</span> 
        </h2>
        <div className='m-4'>
          <h3 className='p-2'>Show Hot Flight Deals</h3>
          <ToggleSwitch checked={showFlights} onChange={toggleFlights} />
        </div>
        <div className='m-4'>
          <h3 className='p-2'>Show Hot Hotels Deals</h3>
          <ToggleSwitch checked={showHotels} onChange={toggleHotels} />
        </div>
      </div>
    </>
  );
}

export default App;
