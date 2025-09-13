// src/components/MenuTemplate/MenuItem.jsx
import React, { useState } from 'react'

const MenuItem = ({ item, viewMode }) => {
  const [showDetails, setShowDetails] = useState(false)

  const getDietaryIcons = () => {
    const icons = []
    if (item.isVeg) icons.push({ icon: '🟢', text: 'Vegetarian' })
    if (item.isVegan) icons.push({ icon: '🌱', text: 'Vegan' })
    if (item.isGlutenFree) icons.push({ icon: '🚫🌾', text: 'Gluten Free' })
    return icons
  }

  const getSpiceLevelIcons = () => {
    return '🌶️'.repeat(item.spiceLevel)
  }

  const formatPrice = () => {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold text-gray-900">
          {item.currency}{item.price}
        </span>
        {item.originalPrice && (
          <span className="text-lg text-gray-500 line-through">
            {item.currency}{item.originalPrice}
          </span>
        )}
      </div>
    )
  }

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
        <div className="flex">
          <div className="w-32 h-32 flex-shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/128?text=No+Image'
              }}
            />
          </div>
          
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <div className="flex space-x-1">
                    {getDietaryIcons().map((dietary, index) => (
                      <span key={index} title={dietary.text}>{dietary.icon}</span>
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
                
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>⏱️ {item.prepTime}</span>
                  <span>🔥 {item.calories} cal</span>
                  {item.spiceLevel > 0 && <span>{getSpiceLevelIcons()}</span>}
                  <span>⭐ {item.rating} ({item.reviewCount})</span>
                </div>
              </div>
              
              <div className="text-right ml-4">
                {formatPrice()}
                <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="aspect-video relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'
          }}
        />
        
        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {item.tags.map((tag, index) => (
            <span 
              key={index}
              className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="absolute top-3 right-3 flex space-x-1">
          {getDietaryIcons().map((dietary, index) => (
            <span 
              key={index} 
              title={dietary.text}
              className="bg-white bg-opacity-90 p-1 rounded"
            >
              {dietary.icon}
            </span>
          ))}
        </div>

        {!item.availability && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Currently Unavailable</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {item.name}
          </h3>
          {formatPrice()}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

        {/* Details */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center space-x-3">
            <span>⏱️ {item.prepTime}</span>
            <span>🔥 {item.calories} cal</span>
            {item.spiceLevel > 0 && <span>{getSpiceLevelIcons()}</span>}
          </div>
          <div className="flex items-center space-x-1">
            <span>⭐ {item.rating}</span>
            <span>({item.reviewCount})</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
          >
            {showDetails ? 'Hide Details' : 'View Details'}
          </button>
          <button 
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              item.availability
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!item.availability}
          >
            {item.availability ? 'Add to Cart' : 'Unavailable'}
          </button>
        </div>

        {/* Expanded Details */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">Ingredients:</h4>
              <p className="text-xs text-gray-600">{item.ingredients.join(', ')}</p>
            </div>
            
            {item.allergens.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">Allergens:</h4>
                <p className="text-xs text-red-600">{item.allergens.join(', ')}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default MenuItem
