// src/pages/DigitalMenu/DigitalMenu.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { menuData } from '../../data/menuData.js';
import MenuHeader from './MenuHeader.jsx';
import MenuFilters from './MenuFilters.jsx';
import MenuGrid from './MenuGrid.jsx';
import ProductModal from './ProductModal.jsx';
import MenuNavbar from './MenuNavbar.jsx';
import './DigitalMenu.css';

const DigitalMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [filteredItems, setFilteredItems] = useState(menuData.menuItems)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const heroStats = useMemo(() => {
    const totalItems = menuData.menuItems.length;
    const categories = `${menuData.categories.length}+`;
    const averageRating = (
      menuData.menuItems.reduce((acc, item) => acc + (item.rating || 0), 0) /
      (totalItems || 1)
    ).toFixed(1);

    return {
      totalItems,
      categories,
      averageRating,
    };
  }, []);

  // Filter menu items based on category and search
  useEffect(() => {
    let items = menuData.menuItems

    // Filter by category
    if (selectedCategory !== 'all') {
      const categoryId = menuData.categories.find(cat => 
        cat.name.toLowerCase() === selectedCategory.toLowerCase()
      )?.id
      items = items.filter(item => item.categoryId === categoryId)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    setFilteredItems(items)
  }, [selectedCategory, searchQuery])

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <div className="digital-menu">
      <div className="menu-container max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <MenuNavbar restaurant={menuData.restaurant} />
        <MenuHeader restaurant={menuData.restaurant} stats={heroStats} />

        <MenuFilters
          categories={menuData.categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalItems={filteredItems.length}
        />

        <div key={selectedCategory}>
          <MenuGrid
            items={filteredItems}
            viewMode={viewMode}
            onProductClick={handleProductClick}
          />
        </div>

        {isModalOpen && selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={closeModal}
            restaurant={menuData.restaurant}
          />
        )}
      </div>
    </div>
  )
}

export default DigitalMenu
