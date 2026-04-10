import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons' // Default icon in case no iconSrc is provided
import '../../Styles/app.css'

function Features({ title, info, iconSrc }) {
  return (
    <>
      <h2 className="sr-only">Features</h2>
      <div className="feature-item">
        {iconSrc ? ( // If iconSrc is provided, use the custom image
          <img src={iconSrc} alt="Feature Icon" className="feature-icon" />
        ) : (
          // If no iconSrc is provided, use the default FontAwesome icon
          <FontAwesomeIcon icon={faComment} className="feature-icon" />
        )}
        <h3 className="feature-item-title">{title}</h3>
        <p>{info}</p>
      </div>
    </>
  )
}

export default Features
