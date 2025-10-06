// src/pages/DigitalMenu/ViewAllMenu.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuNavbar from './MenuNavbar.jsx';
import { menuData } from '../../data/menuData.js';
import ProductCard from './ProductCard.jsx';
import MenuFilters from './MenuFilters.jsx';
import { useRestaurantData } from '../../context/RestaurantDataContext.jsx';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'priceLow', label: 'Price: Low to High' },
  { value: 'priceHigh', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

const ViewAllMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const initialCategory = params.get('category');

  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState(sortOptions[0].value);

  const categories = menuData.categories ?? [];
  const menuItems = menuData.menuItems ?? [];
  const {
    restaurantResponse,
  } = useRestaurantData();
  const mockRestaurantResponse = useMemo(
    () => ({
      data: {
        restaurantName: menuData.restaurant?.name,
        cuisine: menuData.restaurant?.cuisine,
        logoUrl: menuData.restaurant?.logo,
      },
    }),
    []
  );
  const navbarRestaurant = restaurantResponse?.data ? {
    name: restaurantResponse.data.restaurantName,
    cuisine: restaurantResponse.data.cuisine,
    logo: restaurantResponse.data.logoUrl,
    tagline: restaurantResponse.data.tagline ?? menuData.restaurant?.tagline,
  } : menuData.restaurant;
  const navbarResponse = restaurantResponse ?? mockRestaurantResponse;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const filteredItems = useMemo(() => {
    let items = [...menuItems];

    if (selectedCategory && selectedCategory !== 'all') {
      const matchedCategory = categories.find((cat) => cat.name.toLowerCase() === selectedCategory.toLowerCase());
      if (matchedCategory) {
        items = items.filter((item) => item.categoryId === matchedCategory.id);
      }
    }

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      items = items.filter((item) => {
        const matchesName = item.name?.toLowerCase().includes(lowerQuery);
        const matchesDescription = item.description?.toLowerCase().includes(lowerQuery);
        const matchesTags = item.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery));
        const matchesIngredients = item.ingredients?.some((ingredient) => ingredient.toLowerCase().includes(lowerQuery));
        return matchesName || matchesDescription || matchesTags || matchesIngredients;
      });
    }

    switch (sortBy) {
      case 'priceLow':
        items.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        items.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        items.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      default:
        break;
    }

    return items;
  }, [categories, menuItems, searchQuery, selectedCategory, sortBy]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category?.toLowerCase?.() || 'all');
  };

  const handleToggleView = (mode) => {
    setViewMode(mode);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="digital-menu min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <MenuNavbar restaurant={navbarRestaurant} restaurantResponse={navbarResponse} />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-3 pb-20 pt-6 sm:px-4 md:px-6 lg:px-8 xl:px-12">
        <header className="rounded-3xl border border-slate-200/70 bg-white/90 px-6 py-10 shadow-[0_24px_48px_rgba(15,23,42,0.08)] backdrop-blur sm:px-8">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex w-full max-w-3xl flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 sm:text-sm cursor-pointer"
                >
                  <span className="text-base sm:text-lg">←</span>
                  Back
                </button>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50/80 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-emerald-600">
                  Full menu
                </span>
              </div>
              <h1 className="mt-0 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
                Explore every dish on the menu
              </h1>
              <p className="mt-3 max-w-3xl text-sm text-slate-600 sm:text-base">
                Discover crowd favourites, chef specials, and sweet endings—all in one place. Filter, search, and switch views to find the perfect bite faster.
              </p>
            </div>
            <div className="flex w-full items-center justify-end gap-2 sm:w-auto sm:gap-3">
              <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/70 p-1">
                <button
                  type="button"
                  onClick={() => handleToggleView('grid')}
                  className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition sm:px-4 sm:py-2 sm:text-sm ${
                    viewMode === 'grid'
                      ? 'bg-slate-900 text-white shadow'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                  aria-label="Grid view"
                >
                  <span>Grid</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleView('list')}
                  className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition sm:px-4 sm:py-2 sm:text-sm ${
                    viewMode === 'list'
                      ? 'bg-slate-900 text-white shadow'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                  aria-label="List view"
                >
                  <span>List</span>
                </button>
              </div>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="appearance-none rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 focus:border-sky-400 focus:outline-none sm:text-sm"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
              </div>
            </div>
          </div>
        </header>

        <MenuFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalItems={filteredItems.length}
        />

        <section className="rounded-3xl border border-slate-200/70 bg-white/95 p-4 shadow-[0_24px_48px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6 md:p-8">
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">🍽️</div>
              <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">No dishes found</h2>
              <p className="max-w-md text-sm text-slate-500 sm:text-base">
                Try adjusting the filters or search keywords to discover more delicious options.
              </p>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'flex flex-col gap-4'
              }
            >
              {filteredItems.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ViewAllMenu;
