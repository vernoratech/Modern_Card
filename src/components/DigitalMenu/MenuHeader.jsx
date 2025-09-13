// src/components/DigitalMenu/MenuHeader.jsx
import React from 'react'

const MenuHeader = ({ restaurant }) => {
  return (
    <header className="menu-header">
      <div className="header-content">
        <div className="restaurant-info">
          <img 
            src={restaurant.logo} 
            alt={restaurant.name}
            className="restaurant-logo"
          />
          <div className="restaurant-details">
            <h1 className="restaurant-name">{restaurant.name}</h1>
            <p className="restaurant-tagline">{restaurant.tagline}</p>
            <div className="contact-info">
              <span className="phone">📞 {restaurant.phone}</span>
              <span className="address">📍 {restaurant.address}</span>
            </div>
          </div>
        </div>
        
        <div className="header-actions">
          <button className="action-btn primary">
            📱 Order Now
          </button>
          <button className="action-btn secondary">
            📞 Call
          </button>
        </div>
      </div>
    </header>
  )
}

export default MenuHeader
