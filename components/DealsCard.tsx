import React from 'react'
import { CardProps, FlightDeal, HotelDeal } from '@/types';

const DealsCard: React.FC<CardProps> = ({title, data, typeOfData}) => {
  return (
    <div className="deals-card">
      <h2 className='text-lg'>{title}</h2>
      <ul>
        {
          typeOfData === 'flights' ? (
            data.map((deal: FlightDeal) => (
              <li key={deal.id}>
                <span className="route">{deal.to}</span><span className="price">{deal.price}</span>
              </li>
            ))
          ) : (
            data.map((deal: HotelDeal) => (
              <li key={deal.id}>
                <span className="city">{deal.city}</span> - <span className="hotel">{deal.hotel}</span><span className="price">{deal.price} per night</span><span></span>
              </li>
            ))
          )
        }
      </ul>
    </div>
  )
}

export default DealsCard