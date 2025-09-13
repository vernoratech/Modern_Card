// src/components/MenuTemplate/MenuHeader.jsx
import React from 'react'

const MenuHeader = ({ restaurant }) => {
  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-64 md:h-80 lg:h-96 relative overflow-hidden">
        <img
          src={restaurant.coverImage}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        {/* Restaurant Info Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <div className="mb-4">
              <img
                src={restaurant.logo}
                alt={`${restaurant.name} logo`}
                className="w-20 h-20 md:w-28 md:h-28 rounded-full mx-auto border-4 border-white shadow-lg object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/112?text=Logo'
                }}
              />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{restaurant.name}</h1>
            <p className="text-lg md:text-xl opacity-90 mb-4">{restaurant.tagline}</p>
            
            {/* Quick Contact Info */}
            <div className="flex flex-wrap justify-center items-center space-x-6 text-sm md:text-base">
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <span>{restaurant.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📍</span>
                <span className="max-w-xs truncate">{restaurant.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-wrap justify-center md:justify-between items-center space-y-2 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center">
                <span className="text-green-500 mr-1">●</span>
                Open Now
              </span>
              <span>⏱️ 25-30 min delivery</span>
            </div>
            
            <div className="flex items-center space-x-3">
              {restaurant.socialMedia.whatsapp && (
                <a
                  href={`https://wa.me/${restaurant.socialMedia.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                >
                  📱 WhatsApp Order
                </a>
              )}
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                📞 Call Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuHeader
