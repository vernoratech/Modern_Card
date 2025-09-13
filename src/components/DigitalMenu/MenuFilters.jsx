// src/components/DigitalMenu/MenuFilters.jsx
import React from 'react'

const MenuFilters = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  totalItems
}) => {
  return (
    <div className="menu-filters">
      {/* Search Bar */}
      <div className="search-section">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search dishes, ingredients..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button
              className="clear-search"
              onClick={() => onSearchChange('')}
            >
              ✕
            </button>
          )}
        </div>
        
        <div className="results-info">
          <span>{totalItems} items found</span>
          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => onViewModeChange('grid')}
            >
              ⚏
            </button>
            <button
              className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => onViewModeChange('list')}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="category-filters">
        <button
          className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => onCategoryChange('all')}
        >
          <span className="category-icon">🍽️</span>
          All Items
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-btn ${
              selectedCategory.toLowerCase() === category.name.toLowerCase() ? 'active' : ''
            }`}
            onClick={() => onCategoryChange(category.name)}
          >
            <span className="category-icon">{category.icon}</span>
            {category.name}
            <span className="category-count">({category.count})</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default MenuFilters
