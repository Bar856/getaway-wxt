import { useEffect, useState } from 'react';

import './App.css';

import BingSearch from '@/components/BingSearch';
import DealsCard from '@/components/DealsCard';
import SitesContainer from '@/components/SitesContainer';

import { mockHotelDeals, mockFlightDeals } from './data';

// new tab main app

function App() {
  const [showFlights, setShowFlights] = useState<boolean | null>(true)
  const [showHotels, setShowHotels] = useState<boolean | null>(true)
  const [bg , setBg] = useState<string | null >("assets/bg1.webp")
  // check settings from pop up window and get them from local storage
  useEffect(() => {
    const checkSettingsFromPopup = async() =>{
      setShowFlights(await storage.getItem('local:showFlights'))
      setShowHotels(await storage.getItem('local:showHotels'))
      setBg(await storage.getItem('local:newTabBg'))
    }
    checkSettingsFromPopup()
  }, [])
  
  // watch for popup window changes to create responsive UI
  useEffect(() => {
    const unWatchForFlightsChanges = storage.watch<boolean>('local:showFlights', (newState, oldState) => {
      setShowFlights(newState)
    });
    const unWatchForHotelsChanges = storage.watch<boolean>('local:showHotels', (newState, oldState) => {
      setShowHotels(newState)
    });
    const unWatchForBgChanges = storage.watch<boolean>('local:newTabBg', (newState, oldState) => {
      setBg(newState)
    });
    
    return () => {
      unWatchForFlightsChanges()
      unWatchForHotelsChanges()  
      unWatchForBgChanges()
    }
  })

  return (
    <div className='root' style={{backgroundImage:`url('${bg}')`}} >
      <h2 className='text-6xl mb-4'>
        <span className="text-blue-500">G</span> 
        <span className="text-red-500">e</span> 
        <span className="text-yellow-500">t</span> 
        <span className="text-blue-500">a</span> 
        <span className="text-green-500">w</span> 
        <span className="text-red-500">a</span> 
        <span className="text-blue-300">y</span> 
      </h2>
      <div className='m-8 p-4 '>
        <BingSearch/>
      </div>
      <div className='flex flex-row gap-4 m-8'>
        {showFlights && <DealsCard data={mockFlightDeals} typeOfData='flights' title='Hot Flight Deals'/>}
        {showHotels && <DealsCard data={mockHotelDeals} typeOfData='hotels' title='Hot Hotel Deals'/>}
      </div>
      <div className='m-8'>
        <SitesContainer typeOfData='Bookmarks' />
        <SitesContainer typeOfData='Most Recent' />
      </div>
      <div className='m-10 p-4 rounded-full bg-stone-200 bg-opacity-30 backdrop-blur-xl'>
        <q className='italic text-xl'>Hearing about that endless Cali coastline, where the waves are always prime and the vibes are chill, got me itching to bounce and soak up some of that laid-back sunshine life ✈️ </q>
      </div>
    </div>
  );
}

export default App;
