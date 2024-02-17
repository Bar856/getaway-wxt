import { ChangeEvent, useState, useEffect } from 'react';
import loadingGif from '@/assets/loading.gif';

import './App.css';
import ToggleSwitch from '@/components/ToggleSwitch';

// component that renders popup window 
function App() {
  const [showFlights, setShowFlights] = useState<any>(true)
  const [showHotels, setShowHotels] = useState<any>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [bg, setBg] = useState<string | null>(null)

  // check settings from local storage before opening the windows in order to create responsive UI
  useEffect(() => {
    const checkSettingsFromPopup = async() =>{
      setShowFlights(await storage.getItem('local:showFlights'))
      setShowHotels(await storage.getItem('local:showHotels'))
      setBg(await storage.getItem('local:newTabBg'))
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
  const changeBg = (event: ChangeEvent<HTMLSelectElement>) => {
    const newBg = event.target.value;
    setBg(newBg); 
    browser.storage.local.set({ newTabBg: newBg });
  }
  // loading GIF
  if (loading){
    return <img src={loadingGif} className="w-auto" alt="Loading" />
  }
  
  return (
    <>
      <div className='m-4' >
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
        <div className='m-4'>
          <h3 className='p-2'>Background Image</h3>
          <select className='h-8 w-48' onChange={changeBg} value={bg || 'assets/bg1.webp'}>
            <option value="assets/bg1.webp">Nice Beach</option>
            <option value="assets/bg2.webp">Beautiful View</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default App;
