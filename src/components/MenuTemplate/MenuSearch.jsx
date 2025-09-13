// src/components/MenuTemplate/MenuSearch.jsx
import React from 'react'

const MenuSearch = ({ searchQuery, onSearchChange, viewMode, onViewModeChange, totalItems }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">🔍</span>
          </div>
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Results Count & View Mode */}
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">
          {totalItems} {totalItems === 1 ? 'item' : 'items'} found
        </span>
        
        {/* View Mode Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded text-sm ${
              viewMode === 'grid' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title="Grid View"
          >
            ⚏
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded text-sm ${
              viewMode === 'list' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title="List View"
          >
            ☰
          </button>
          <button
            onClick={() => onViewModeChange('card')}
            className={`p-2 rounded text-sm ${
              viewMode === 'card' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title="Card View"
          >
            ⚏
          </button>
        </div>
      </div>
    </div>
  )
}

export default MenuSearch
