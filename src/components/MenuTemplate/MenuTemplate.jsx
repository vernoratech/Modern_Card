// src/components/MenuTemplate/MenuTemplate.jsx
import React, { useState, useEffect } from 'react'
import { sampleMenuData } from '../../data/menuData.js'
import MenuHeader from './MenuHeader.jsx'
import MenuNavigation from './MenuNavigation.jsx'
import MenuCategories from './MenuCategories.jsx'
import MenuItems from './MenuItems.jsx'
import MenuSearch from './MenuSearch.jsx'
import MenuFooter from './MenuFooter.jsx'

const MenuTemplate = ({ restaurantData = null, menuData = null }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredItems, setFilteredItems] = useState([])
  const [viewMode, setViewMode] = useState('grid') // 'grid', 'list', 'card'

  // Use provided data or fallback to sample data
  const data = menuData || sampleMenuData
  const restaurant = restaurantData || data.restaurant

  useEffect(() => {
    let items = data.menuItems

    // Filter by category
    if (selectedCategory !== 'all') {
      const categoryId = data.categories.find(cat => cat.name.toLowerCase() === selectedCategory)?.id
      items = items.filter(item => item.categoryId === categoryId)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    setFilteredItems(items)
  }, [selectedCategory, searchQuery, data])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <MenuHeader restaurant={restaurant} />

      {/* Navigation */}
      <MenuNavigation 
        categories={data.categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Search & Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <MenuSearch 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalItems={filteredItems.length}
        />
      </div>

      {/* Categories Overview (when "all" is selected) */}
      {selectedCategory === 'all' && (
        <MenuCategories 
          categories={data.categories}
          onCategorySelect={setSelectedCategory}
        />
      )}

      {/* Menu Items */}
      <MenuItems 
        items={filteredItems}
        viewMode={viewMode}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
      />

      {/* Footer */}
      <MenuFooter restaurant={restaurant} />
    </div>
  )
}

export default MenuTemplate
