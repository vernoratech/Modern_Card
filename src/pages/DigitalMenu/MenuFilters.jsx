// src/components/DigitalMenu/MenuFilters.jsx
import React, { useRef } from 'react'
import { BsSearchHeart } from 'react-icons/bs';
import { LuUtensilsCrossed } from 'react-icons/lu';
import { TbReportSearch } from 'react-icons/tb';

const MenuFilters = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  totalItems
}) => {
  // Use categories prop (dynamic or static based on what's passed)
  const safeCategories = Array.isArray(categories) ? categories.filter(Boolean) : [];
  const selectedCategoryValue = (selectedCategory ?? 'all').toLowerCase();

  // console.log('MenuFilters Debug:', {
  //   categories,
  //   safeCategories: safeCategories.length,
  //   selectedCategory,
  //   selectedCategoryValue,
  //   isArray: Array.isArray(categories),
  //   sampleCategory: safeCategories[0]
  // });

  const categoriesContainerRef = useRef(null);

  const handleCategorySelect = (categoryName, buttonElement) => {
    if (!categoryName) return;
    onCategoryChange?.(categoryName);

    const container = categoriesContainerRef.current;
    if (!container || !buttonElement) {
      return;
    }

    if (categoryName.toLowerCase() === 'all') {
      container.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const buttonRect = buttonElement.getBoundingClientRect();

    const isOverflowingLeft = buttonRect.left < containerRect.left;
    const isOverflowingRight = buttonRect.right > containerRect.right;

    if (isOverflowingLeft || isOverflowingRight) {
      const containerCenter = containerRect.left + (containerRect.width / 2);
      const buttonCenter = buttonRect.left + (buttonRect.width / 2);
      const offset = buttonCenter - containerCenter;
      container.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="menu-filters"
      className="relative mt-6 sm:mt-8 md:mt-10 rounded-3xl bg-gradient-to-br from-white via-white to-slate-50/80 p-6 sm:p-8 md:p-10 shadow-[0_32px_64px_rgba(15,23,42,0.12)] backdrop-blur-xl border border-white/60"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sky-50/40 via-transparent to-indigo-50/40" />
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-sky-200/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-indigo-200/20 to-transparent rounded-full blur-3xl" />

      <div className="relative">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent mb-2">
            Discover Delicious Dishes
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Search through our curated collection of mouthwatering meals
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-center md:justify-between">
          {/* Enhanced Search Bar */}
          <div className="relative flex-1 max-w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-400/10 to-indigo-400/10 rounded-2xl blur-lg" />
            <div className="relative">

              <input
                type="text"
                placeholder="Search dishes, ingredients, cuisine..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full rounded-2xl border-0 bg-white/80 backdrop-blur-sm py-3.5 sm:py-4 pl-12 sm:pl-14 pr-12 sm:pr-14 text-sm sm:text-base font-medium text-slate-700 shadow-lg shadow-slate-900/10 transition-all duration-300 focus:bg-white focus:shadow-xl focus:shadow-sky-500/20 focus:outline-none focus:ring-2 focus:ring-sky-400/50 placeholder:text-slate-500"
              />
              {searchQuery && (
                <button
                  className="absolute right-3 sm:right-4 top-1/2 flex h-5 w-5 sm:h-6 sm:w-6 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-r from-slate-400 to-slate-500 text-sm font-semibold text-white shadow-lg transition-all hover:from-slate-500 hover:to-slate-600 hover:scale-105"
                  onClick={() => onSearchChange('')}
                >
                  <LuUtensilsCrossed />
                </button>
              )}
              <span className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-lg sm:text-xl text-slate-500"><BsSearchHeart /></span>
            </div>
          </div>

          {/* Enhanced Items Counter */}
          {<div className="flex w-full items-center justify-end md:w-auto">
            <div className="rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 px-4 sm:px-5 py-2.5 sm:py-3 shadow-lg shadow-emerald-500/10">
              <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex items-center gap-2">
                <span><TbReportSearch className=" text-xl text-teal-500" /></span><span>{totalItems} items found</span>
              </span>
            </div>
          </div>}
        </div>

        {/* Enhanced Category Filters */}
        <div className="mt-2 sm:mt-3">
          <h3 className="text-sm sm:text-base font-semibold text-slate-700 mb-4 sm:mb-5">
            Browse by Category
          </h3>

          <div
            id="menu-categories"
            ref={categoriesContainerRef}
            className="flex w-full snap-x gap-3 sm:gap-4 overflow-x-auto pb-4 sm:pb-5 scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {/* All Items Button - Dynamic Width */}
            <button
              className={`group relative flex shrink-0 snap-start items-center justify-center gap-2 sm:gap-3 rounded-2xl border px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-300 ${selectedCategory === 'all'
                ? 'border-transparent bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-xl shadow-emerald-500/40 scale-105'
                : 'border-slate-200/60 bg-white/80 text-slate-600 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50/80 hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-102'
              }`}
              onClick={(event) => handleCategorySelect('all', event.currentTarget)}
            >
              <span className={`text-base sm:text-lg transition-transform group-hover:scale-110 ${selectedCategory === 'all' ? 'animate-pulse' : ''}`}>
                🍽️
              </span>
              <div className="flex items-center justify-center">
                <span className="leading-tight whitespace-nowrap">All Items</span>
              </div>
              {selectedCategory === 'all' && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping" />

              )}
            </button>

            {/* Category Buttons - Dynamic Width */}
            {safeCategories.length > 0 ? (
              safeCategories.map((category) => {
                const categoryName = category?.name ?? '';
                const active = categoryName && selectedCategoryValue === categoryName.toLowerCase();
                const categoryId = category?._id || category?.id; // Handle both API and static formats
                return (
                  <button
                    key={categoryId}
                    className={`group relative flex shrink-0 snap-start items-center gap-2 sm:gap-3 rounded-2xl border px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-300 ${active
                      ? 'border-transparent bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-xl shadow-emerald-500/40 scale-105'
                      : 'border-slate-200/60 bg-white/80 text-slate-600 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50/80 hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-102'
                    }`}
                    onClick={(event) => categoryName && handleCategorySelect(categoryName, event.currentTarget)}
                  >
                    <span className={`text-base sm:text-lg transition-transform group-hover:scale-110 ${active ? 'animate-pulse' : ''}`}>
                      {category.icon || '🍽️'}
                    </span>
                    <div className="flex items-center justify-center">
                      <span className="leading-tight whitespace-nowrap">{categoryName || 'Category'}{active ? ` (${totalItems})` : ''}</span>
                    </div>
                    {active && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping" />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="flex items-center justify-center w-full py-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                  <p className="text-slate-600 text-sm">Loading categories...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MenuFilters
