import React from 'react'
import { Site } from '@/types'

// component that render site squares

const SiteCard: React.FC<Site> = ({ title, url }) => {
  return (
    <a href={url} className='site-card' target="_blank" rel="noopener noreferrer">
      <div className="bookmark-icon">
        {/* favicon pull */}
        <img src={`https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(url)}`} alt='favicon'/>
      </div>
      <p>{title}</p>
    </a>
  )
}

export default SiteCard