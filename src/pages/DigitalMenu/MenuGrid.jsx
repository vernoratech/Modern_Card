// src/pages/DigitalMenu/MenuGrid.jsx
import React, { useMemo } from 'react';
import ProductCard from './ProductCard';

const MenuGrid = ({ items, viewMode, onProductClick }) => {
  const emptyState = useMemo(() => (
    <div 
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="bg-gray-100 p-6 rounded-2xl max-w-md w-full">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-50 flex items-center justify-center">
          <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
        <p className="text-gray-600 mb-6">We couldn't find any items matching your criteria.</p>
        <button 
          className="px-6 py-2 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors"
          onClick={() => {
            // Reset filters logic here
            console.log('Reset filters clicked');
          }}
        >
          Reset Filters
        </button>
      </div>
    </div>
  ), []);
  if (items.length === 0) {
    return emptyState;
  }

  return (
    <div 
      id="menu-grid"
      className={`${viewMode === 'grid'
        ? 'grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 p-3 sm:p-4 md:p-5 lg:p-6'
        : 'space-y-4 sm:space-y-5 md:space-y-6 max-w-5xl mx-auto p-3 sm:p-4 md:p-5 lg:p-6'}`}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className={viewMode === 'grid' ? 'h-full' : ''}
        >
          <ProductCard
            product={item}
            viewMode={viewMode}
            onProductClick={onProductClick}
          />
        </div>
      ))}
    </div>
  );
};

export default MenuGrid;
