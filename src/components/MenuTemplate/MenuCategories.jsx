// src/components/MenuTemplate/MenuCategories.jsx
import React from 'react'

const MenuCategories = ({ categories, onCategorySelect }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Menu Categories</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our carefully curated selection of dishes, each category offering unique flavors and experiences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => onCategorySelect(category.name.toLowerCase())}
            className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
              <div className="absolute top-4 left-4">
                <span className="text-3xl">{category.icon}</span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {category.description}
              </p>
              
              <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                <span>View Items</span>
                <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MenuCategories
