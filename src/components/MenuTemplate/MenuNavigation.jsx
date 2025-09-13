// src/components/MenuTemplate/MenuNavigation.jsx
import React from 'react'

const MenuNavigation = ({ categories, selectedCategory, onCategoryChange }) => {
  const allCategories = [
    { id: 'all', name: 'All Items', icon: '🍽️' },
    ...categories
  ]

  return (
    <div className="sticky top-0 z-40 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex overflow-x-auto scrollbar-hide py-4 space-x-2">
          {allCategories.map((category) => {
            const isSelected = selectedCategory === (category.id === 'all' ? 'all' : category.name.toLowerCase())
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id === 'all' ? 'all' : category.name.toLowerCase())}
                className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isSelected
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span className="whitespace-nowrap">{category.name}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MenuNavigation
