// src/pages/DigitalMenu/DigitalMenu.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { menuData } from '../../data/menuData.js';
import MenuHeader from './MenuHeader.jsx';
import MenuFilters from './MenuFilters.jsx';
import MenuGrid from './MenuGrid.jsx';
import ProductModal from './ProductModal.jsx';
import MenuNavbar from './MenuNavbar.jsx';
import MenuHorizontalShowcase from './MenuHorizontalShowcase.jsx';
import './DigitalMenu.css';
import { MdOutlineTableBar } from "react-icons/md";
import { useRestaurantData } from '../../context/RestaurantDataContext.jsx';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext.jsx';

const DigitalMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    restaurantId,
    restaurantResponse,
    restaurantError,
    setIdentifiers,
    tableId,
    tableResponse,
    tableError,
  } = useRestaurantData();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [filteredItems, setFilteredItems] = useState(menuData.menuItems)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showTableBanner, setShowTableBanner] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const rawRestaurantId = params.get('restaurant_id');
    const rawTableId = params.get('table_id');

    const decodedRestaurantId = rawRestaurantId ? decodeURIComponent(rawRestaurantId) : null;
    const normalizedRestaurantId = decodedRestaurantId ? decodedRestaurantId.split('/')[0] : null;

    const decodedTableId = rawTableId ? decodeURIComponent(rawTableId) : undefined;
    const normalizedTableId = decodedTableId ? decodedTableId.split('/').pop() : undefined;

    const identifiers = {};
    if (normalizedRestaurantId) {
      identifiers.restaurantId = normalizedRestaurantId;
    }
    if (normalizedTableId !== undefined) {
      identifiers.tableId = normalizedTableId;
    }

    if (Object.keys(identifiers).length > 0) {
      setIdentifiers(identifiers);
    }
  }, [location.search, setIdentifiers]);

  useEffect(() => {
    if (!restaurantId && !tableId) {
      return;
    }

    const params = new URLSearchParams(location.search);
    if (!params.get('restaurant_id') && restaurantId) {
      params.set('restaurant_id', restaurantId);
    }
    if (!params.get('table_id') && tableId) {
      params.set('table_id', tableId);
    }

    const newSearch = params.toString();
    const currentSearch = location.search.startsWith('?') ? location.search.slice(1) : location.search;
    if (newSearch && newSearch !== currentSearch) {
      navigate({ pathname: location.pathname, search: `?${newSearch}` }, { replace: true, state: location.state });
    }
  }, [restaurantId, tableId, location.pathname, location.search, location.state, navigate]);

  useEffect(() => {
    if (restaurantResponse) {
      console.log('Restaurant API response:', restaurantResponse);
    }
  }, [restaurantResponse]);

  useEffect(() => {
    if (restaurantError) {
      console.error('Error fetching restaurant menu data:', restaurantError);
    }
  }, [restaurantError]);

  useEffect(() => {
    if (tableResponse) {
      console.log('Table API response:', tableResponse);
    }
  }, [tableResponse]);

  useEffect(() => {
    if (tableError) {
    }
  }, [tableError]);

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

  const showcaseItems = useMemo(() => {
    const shuffled = [...menuData.menuItems]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);
    return shuffled.map((item) => ({
      ...item,
      tag: item.isBestseller ? 'Best Seller' : item.isVeg ? 'Veg' : 'Popular',
    }));
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

  const handleCategoryChange = (categoryName) => {
    if (!categoryName) return;
    const normalized = categoryName.toLowerCase();
    setSelectedCategory(normalized);
    window.requestAnimationFrame(() => {
      document.getElementById('menu-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleShowcaseAdd = (item) => {
    if (!item) return;
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      isVeg: item.isVeg,
      isVegan: item.isVegan,
      isGlutenFree: item.isGlutenFree,
      quantity: 1,
    });
    addToast({
      type: 'success',
      title: 'Added to cart',
      message: `${item.name} is ready in your cart.`,
      position: 'bottom-right',
    });
  };

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const tableData = tableResponse?.data ?? null;
  const tableStatusColor = tableData?.status === 'available' ? 'text-emerald-400' : 'text-amber-400';
  const reservationColor = tableData?.reservedStatus ? 'text-rose-400' : 'text-emerald-400';

  useEffect(() => {
    if (tableData) {
      setShowTableBanner(true);
    }
  }, [tableData]);

  return (
    <div className="digital-menu">
      <div className="menu-container max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <MenuNavbar restaurant={menuData.restaurant} restaurantResponse={restaurantResponse} />

        {tableData && showTableBanner && (
          <div className="fixed bottom-4 right-4 z-40 w-[85vw] max-w-xs sm:max-w-sm pointer-events-none sm:bottom-6 sm:right-6">
            <section className="pointer-events-auto relative overflow-hidden rounded-2xl border border-slate-900/30 bg-slate-900/90 text-white shadow-2xl backdrop-blur">
              <button
                type="button"
                onClick={() => setShowTableBanner(false)}
                className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/15 text-xs font-semibold text-white transition hover:bg-white/30 cursor-pointer"
                aria-label="Dismiss table details"
              >
                ✕
              </button>
              <div className="space-y-3 p-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em]">
                    <span>Table #{tableData.tableNumber}</span>
                    <span className="text-[10px] font-medium normal-case tracking-normal text-white/70">{tableData.location}</span>
                  </div>
                  <h3 className="text-base font-semibold sm:text-lg">Reserved table details</h3>
                  <p className="text-xs text-white/80 sm:text-sm">
                    Seating capacity for {tableData.capacity} guests · Status{' '}
                    <span className="font-semibold capitalize text-white">{tableData.status}</span>
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-xl border border-white/10 bg-white/10 p-2 text-center">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">Capacity</p>
                    <p className="text-lg font-semibold">{tableData.capacity}</p>
                  </div>
                  <div className="rounded-xl border border-${tableData.status === 'available' ? 'emerald' : 'amber'}-400/30 bg-white/10 p-2 text-center">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">Status</p>
                    <p className={`text-base font-semibold capitalize ${tableStatusColor}`}>{tableData.status}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/10 p-2 text-center">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">Reserved</p>
                    <p className={`text-base font-semibold ${reservationColor}`}>{tableData.reservedStatus ? 'Yes' : 'No'}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => document.getElementById('menu-grid')?.scrollIntoView({ behavior: 'smooth' })}
                  className="mt-1 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-sm transition hover:from-sky-400 hover:to-indigo-400 cursor-pointer"
                >
                  Book this table
                </button>
              </div>
            </section>
          </div>
        )}

        {tableData && !showTableBanner && (
          <button
            type="button"
            onClick={() => setShowTableBanner(true)}
            className="fixed bottom-4 right-4 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-900/20 bg-sky-500 text-white shadow-xl transition hover:bg-sky-400 sm:bottom-6 sm:right-6 cursor-pointer"
            aria-label="Show table details"
          >
            <MdOutlineTableBar />
          </button>
        )}

        <MenuHeader restaurant={menuData.restaurant} stats={heroStats} restaurantResponse={restaurantResponse} />

        <MenuFilters
          categories={menuData.categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalItems={filteredItems.length}
        />



        <div key={selectedCategory}>
          <MenuGrid
            items={filteredItems}
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

        <MenuHorizontalShowcase
          title="Explore quick picks"
          subtitle="A few popular bites you might enjoy"
          items={showcaseItems}
          onItemClick={handleProductClick}
          onAdd={handleShowcaseAdd}
        />
      </div>
    </div>
  )
}

export default DigitalMenu
