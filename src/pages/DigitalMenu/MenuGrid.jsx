// src/pages/DigitalMenu/MenuGrid.jsx
import React, { useMemo } from 'react';
import ProductCard from './ProductCard';
import { GiSadCrab } from 'react-icons/gi';

const MenuGrid = ({ items, onProductClick }) => {
  const emptyState = useMemo(() => (
    <div
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="bg-gray-100 p-6 rounded-2xl max-w-md w-full">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-50 flex items-center justify-center">
          <GiSadCrab className='w-10 h-10 text-gray-600 ' />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
        <p className="text-gray-600 mb-6">We couldn't find any items matching your criteria.</p>
        <button
          className="px-6 py-2 bg-gray-200 text-gray-900 rounded-full font-medium hover:bg-gray-300 transition-colors"
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
      className="relative"
    >
      <div
        className="flex snap-x overflow-x-auto gap-4 sm:gap-5 lg:gap-6 p-4 sm:p-5 md:p-6 scroll-smooth"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {items.map((item) => (
          <div
            key={item.id || item._id}
            className="snap-start flex-shrink-0 w-[14.5rem] sm:w-[17rem] md:w-[18.5rem] lg:w-[20rem] transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <ProductCard
              product={item}
              viewMode="grid"
              onProductClick={onProductClick}
            />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/85 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-3 bg-gradient-to-l from-[#f8fafc] via-[#f8fafc]/85 to-transparent" />
      <style>{`
        #menu-grid > div::-webkit-scrollbar { display: none; }
        #menu-grid > div { scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default MenuGrid;
