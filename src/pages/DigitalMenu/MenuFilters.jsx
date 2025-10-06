// src/components/DigitalMenu/MenuFilters.jsx
import React from 'react'

const MenuFilters = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  totalItems
}) => {
  const safeCategories = Array.isArray(categories) ? categories.filter(Boolean) : [];
  const selectedCategoryValue = (selectedCategory ?? 'all').toLowerCase();

  return (
    <section
      id="menu-filters"
      className="mt-6 sm:mt-8 md:mt-10 rounded-2xl sm:rounded-3xl border border-slate-200/70 bg-white/90 p-4 sm:p-6 md:p-8 shadow-[0_24px_48px_rgba(15,23,42,0.08)] backdrop-blur"
    >
      <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-full">
          <span className="pointer-events-none absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-base sm:text-lg">🔍</span>
          <input
            type="text"
            placeholder="Search dishes, ingredients..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/70 py-2.5 sm:py-3 pl-10 sm:pl-12 pr-10 sm:pr-12 text-sm sm:text-base font-medium text-slate-700 shadow-inner shadow-white/40 transition focus:border-sky-400 focus:bg-white focus:outline-none"
          />
          {searchQuery && (
            <button
              className="absolute right-2 sm:right-3 top-1/2 flex h-6 w-6 sm:h-8 sm:w-8 -translate-y-1/2 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600 transition hover:bg-slate-300"
              onClick={() => onSearchChange('')}
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex w-full items-center justify-end gap-2 sm:gap-3 text-xs sm:text-sm font-semibold text-slate-600 md:w-auto">
          <span className="rounded-full border border-slate-200 px-3 sm:px-4 py-1.5 sm:py-2 text-slate-700">
            {totalItems} items found
          </span>
        </div>
      </div>

      <div
        id="menu-categories"
        className="mt-4 sm:mt-6 flex w-full snap-x gap-2 sm:gap-3 overflow-x-auto pb-3 sm:pb-4"
      >
        <button
          className={`flex snap-start items-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-2xl border px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-semibold transition ${
            selectedCategory === 'all'
              ? 'border-transparent bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg shadow-indigo-500/30'
              : 'border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-600'
          }`}
          onClick={() => onCategoryChange('all')}
        >
          <span className="text-sm sm:text-base">🍽️</span>
          All Items
          <span className="text-xs font-medium opacity-80">({totalItems})</span>
        </button>

        {safeCategories.map((category) => {
          const categoryName = category?.name ?? '';
          const active = categoryName && selectedCategoryValue === categoryName.toLowerCase();
          return (
            <button
              key={category.id}
              className={`flex snap-start items-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-2xl border px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-semibold transition ${
                active
                  ? 'border-transparent bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-600'
              }`}
              onClick={() => categoryName && onCategoryChange?.(categoryName)}
            >
              <span className="text-sm sm:text-base">{category.icon}</span>
              {categoryName || 'Category'}
              <span className="text-xs font-medium opacity-80">({category.count ?? 0})</span>
            </button>
          );
        })}
      </div>
    </section>
  )
}

export default MenuFilters
