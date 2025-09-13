// src/components/MenuTemplate/MenuItems.jsx
import React from 'react'
import MenuItem from './MenuItem.jsx'

const MenuItems = ({ items, viewMode, selectedCategory, searchQuery }) => {
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-600">
            {searchQuery 
              ? `No menu items match "${searchQuery}"`
              : `No items available in ${selectedCategory} category`
            }
          </p>
        </div>
      </div>
    )
  }

  const getGridClasses = () => {
    switch (viewMode) {
      case 'list':
        return 'grid grid-cols-1 gap-4'
      case 'card':
        return 'grid grid-cols-1 md:grid-cols-2 gap-6'
      default: // grid
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {selectedCategory !== 'all' && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 capitalize">
            {selectedCategory} ({items.length})
          </h2>
        </div>
      )}

      <div className={getGridClasses()}>
        {items.map((item) => (
          <MenuItem 
            key={item.id} 
            item={item} 
            viewMode={viewMode}
          />
        ))}
      </div>
    </div>
  )
}

export default MenuItems
