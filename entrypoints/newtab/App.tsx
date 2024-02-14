import { useEffect, useState } from 'react';

import './App.css';

import BingSearch from '@/components/BingSearch';
import DealsCard from '@/components/DealsCard';
import SitesContainer from '@/components/SitesContainer';

import { mockHotelDeals, mockFlightDeals } from './data';

function App() {
  const [showFlights, setShowFlights] = useState<boolean | null>(true)
  const [showHotels, setShowHotels] = useState<boolean | null>(true)
  
  useEffect(() => {
    const checkSettingsFromPopup = async() =>{
      setShowFlights(await storage.getItem('local:showFlights'))
      setShowHotels(await storage.getItem('local:showHotels'))
    }
    checkSettingsFromPopup()
  }, [])
  
  
  useEffect(() => {
    const unWatchForFlightsChanges = storage.watch<boolean>('local:showFlights', (newState, oldState) => {
      setShowFlights(newState)
    });
    const unWatchForHotelsChanges = storage.watch<boolean>('local:showHotels', (newState, oldState) => {
      setShowHotels(newState)
    });
    
    return () => {
      unWatchForFlightsChanges()
      unWatchForHotelsChanges()  
    }
  })

  return (
    <>
      <h2 className='text-4xl mb-16'>
        <span className="text-blue-500">G</span> 
        <span className="text-red-500">e</span> 
        <span className="text-yellow-500">t</span> 
        <span className="text-blue-500">a</span> 
        <span className="text-green-500">w</span> 
        <span className="text-red-500">a</span> 
        <span className="text-blue-300">y</span> 
      </h2>
      <BingSearch/>
      <div className='mr-10 ml-10 mb-10'>
        <q className='italic text-lg'>Hearing about that endless Cali coastline, where the waves are always prime and the vibes are chill, got me itching to bounce and soak up some of that laid-back sunshine life ✈️ </q>
      </div>
      <div className='flex flex-row gap-10 m-10'>
        {showFlights && <DealsCard data={mockFlightDeals} typeOfData='flights' title='Hot Flight Deals'/>}
        {showHotels && <DealsCard data={mockHotelDeals} typeOfData='hotels' title='Hot Hotel Deals'/>}
      </div>
      <SitesContainer typeOfData='Bookmarks' />
      <SitesContainer typeOfData='Most Recent' />
    </>
  );
}

export default App;
