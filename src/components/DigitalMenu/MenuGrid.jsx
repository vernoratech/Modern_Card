// src/components/DigitalMenu/MenuGrid.jsx
import React from 'react'
import ProductCard from './ProductCard.jsx'

const MenuGrid = ({ items, viewMode, onProductClick }) => {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <h3>No items found</h3>
        <p>Try adjusting your search or filter criteria</p>
      </div>
    )
  }

  return (
    <div className={`menu-grid ${viewMode}`}>
      {items.map((item) => (
        <ProductCard
          key={item.id}
          product={item}
          viewMode={viewMode}
          onClick={() => onProductClick(item)}
        />
      ))}
    </div>
  )
}

export default MenuGrid
