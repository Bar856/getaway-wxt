import { ChangeEvent, useState, useEffect } from 'react';
import loadingGif from '@/assets/loading.gif';

import './App.css';
import ToggleSwitch from '@/components/ToggleSwitch';

function App() {

  const [showFlights, setShowFlights] = useState<any>(true)
  const [showHotels, setShowHotels] = useState<any>(true)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const checkSettingsFromPopup = async() =>{
      setShowFlights(await storage.getItem('local:showFlights'))
      setShowHotels(await storage.getItem('local:showHotels'))
      setLoading(false)
    }
    checkSettingsFromPopup()

  }, [])


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
  
  if (loading){
    return <img src={loadingGif} className="w-auto" alt="Loading" />
  }
  
  return (
    <>
      <h2 className='text-2xl mb-16'>
        Getaway Settings
      </h2>
      <div className='flex flex-row gap-8'>
        <h3>Show Hot Flight Deals</h3>
        <ToggleSwitch checked={showFlights} onChange={toggleFlights} />
        <h3>Show Hot Hotels Deals</h3>
        <ToggleSwitch checked={showHotels} onChange={toggleHotels} />
      </div>
    </>
  );
}

export default App;
