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
import { fetchCategories } from '../../services/restaurantService.js';
import { useRestaurantData } from '../../context/RestaurantDataContext.jsx';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext.jsx';
import { buildShowcaseItems } from '../../utils/helpers.js';

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
    restaurantLoading,
    tableLoading,
    restaurantMenuItemsResponse,
    restaurantMenuItemsError,
    restaurantMenuItemsLoading,
  } = useRestaurantData();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [menuItemsData, setMenuItemsData] = useState(menuData.menuItems)
  const [filteredItems, setFilteredItems] = useState(menuData.menuItems)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showTableBanner, setShowTableBanner] = useState(true)
  const [isInitializingFromUrl, setIsInitializingFromUrl] = useState(false)
  const [isApiMode, setIsApiMode] = useState(false)
  const [dynamicCategories, setDynamicCategories] = useState([])
  const [categoriesLoading, setCategoriesLoading] = useState(false)
  const [lastFetchedRestaurantId, setLastFetchedRestaurantId] = useState(null)

  useEffect(() => {
    const storedData = getStorageWithTTL();
    if (storedData?.categories?.length) {
      setDynamicCategories(storedData.categories);
      if (storedData.restaurantId) {
        setLastFetchedRestaurantId(storedData.restaurantId);
      }
    }
  }, [])

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
      setIsInitializingFromUrl(true);
      setIdentifiers(identifiers);
    }
  }, [location.search, setIdentifiers]);

  // Fetch dynamic categories when we have restaurant_id (from URL or localStorage)
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const urlRestaurantId = urlParams.get('restaurant_id');
    const urlTableId = urlParams.get('table_id');
    const storedData = getStorageWithTTL();
    const storedRestaurantId = storedData?.restaurantId;
    const storedTableId = storedData?.tableId;

    const currentRestaurantId = urlRestaurantId || restaurantId || storedRestaurantId;
    if (!currentRestaurantId) {
      return;
    }

    const hasCachedCategories = dynamicCategories.length > 0 || storedData?.categories?.length > 0;
    if (lastFetchedRestaurantId === currentRestaurantId && hasCachedCategories) {
      return;
    }

    setCategoriesLoading(true);
    fetchCategories(currentRestaurantId)
      .then(response => {
        if (response.success && response.data) {
          const transformedCategories = response.data
            .filter(category => category.isActive)
            .map((category, index) => ({
              id: category._id,
              _id: category._id,
              name: category.name,
              icon: getCategoryIcon(category.name, index),
              count: category.count ?? 0
            }));

          setDynamicCategories(transformedCategories);
          setLastFetchedRestaurantId(currentRestaurantId);

          const tableIdentifier = urlTableId || tableId || storedTableId || null;
          setStorageWithTTL(currentRestaurantId, tableIdentifier, transformedCategories);
        }
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setDynamicCategories([]);
      })
      .finally(() => {
        setCategoriesLoading(false);
      });
  }, [location.search, restaurantId, tableId, dynamicCategories.length, lastFetchedRestaurantId]);

  // Function to get appropriate icon for categories
  const getCategoryIcon = (categoryName, index) => {
    const iconMap = {
      'Starters': '🥗',
      'Main Course': '🍛',
      'Beverages': '🥤',
      'Desserts': '🍨',
      'Sides': '🥘',
      'Breakfast': '🥐',
      'Healthy': '🥗',
      'Kids': '🧸',
      'Specials': '⭐',
      'Bakery': '🥖'
    };

    return iconMap[categoryName] || '🍽️';
  };

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
    if (restaurantError) {
      console.error('Error fetching restaurant menu data:', restaurantError);
    }
  }, [restaurantError]);

  useEffect(() => {
    if (tableError) {
    }
  }, [tableError]);

  const heroStats = useMemo(() => {
    const totalItems = menuItemsData.length;
    const categories = (dynamicCategories?.length || 0) > 0 ? `${dynamicCategories.length}+` : `${menuData.categoriesApiResponse?.data?.length || 0}+`;
    const averageRating = (
      menuItemsData.reduce((acc, item) => acc + (item.rating || 0), 0) /
      (totalItems || 1)
    ).toFixed(1);

    return {
      totalItems,
      categories,
      averageRating,
    };
  }, [menuItemsData, dynamicCategories]);

  const showcaseItems = useMemo(() => {
    const items = buildShowcaseItems(menuItemsData, { limit: 8 });
    console.log('Showcase items created:', items.length);
    return items;
  }, [menuItemsData]);

  { console.log("menuItemsData:", menuItemsData); }

  const MAIN_COURSE_CATEGORY_ID = '68e0d4772ea12265636db3e0';

  const mainCourseItems = useMemo(() => {
    const items = buildShowcaseItems(menuItemsData, {
      key: 'productCategory',
      value: MAIN_COURSE_CATEGORY_ID,
      limit: 8,
    });
    console.log('Main course items selected:', items.length);
    return items;
  }, [menuItemsData]);

  // Utility functions for localStorage with TTL
  const STORAGE_KEY = 'restaurant_session';
  const TTL_HOURS = 1;

  const setStorageWithTTL = (restaurantId, tableId, categories = null) => {
    const expirationTime = Date.now() + (TTL_HOURS * 60 * 60 * 1000); // 1 hour from now
    const data = {
      restaurantId,
      tableId,
      expirationTime,
      categories: categories ? JSON.stringify(categories) : null
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const getStorageWithTTL = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;

      const data = JSON.parse(stored);
      if (Date.now() > data.expirationTime) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }

      return {
        restaurantId: data.restaurantId,
        tableId: data.tableId,
        categories: data.categories ? JSON.parse(data.categories) : null
      };
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  };

  const clearStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  // Centralized data management for menu items
  useEffect(() => {
    // Check sources in order of priority: URL → localStorage → preview mode
    let restaurantId = null;
    let tableId = null;
    let apiModeSource = 'none';

    // 1. Check URL parameters first
    const urlParams = new URLSearchParams(location.search);
    const urlRestaurantId = urlParams.get('restaurant_id');
    const urlTableId = urlParams.get('table_id');

    if (urlRestaurantId && urlTableId) {
      restaurantId = urlRestaurantId;
      tableId = urlTableId;
      apiModeSource = 'url';

      // Store in localStorage for future use
      setStorageWithTTL(restaurantId, tableId);
      setIsApiMode(true);

      // Set identifiers in context for API calls
      setIdentifiers({ restaurantId, tableId });
    } else {
      // 2. Check localStorage if URL params not available
      const storedData = getStorageWithTTL();
      if (storedData && storedData.restaurantId && storedData.tableId) {
        restaurantId = storedData.restaurantId;
        tableId = storedData.tableId;
        apiModeSource = 'localStorage';
        setIsApiMode(true);

        // Set identifiers in context for API calls
        setIdentifiers({ restaurantId, tableId });
      } else {
        // 3. Preview mode - no API parameters
        apiModeSource = 'preview';
        setIsApiMode(false);
      }
    }

    if (isApiMode && restaurantId && tableId) {
      // API mode - check if we need to load data
      const hasApiData = Boolean(restaurantMenuItemsResponse?.data?.items?.length > 0 || restaurantMenuItemsResponse?.data?.length > 0);

      if (hasApiData) {
        // We already have API data loaded
        if (restaurantMenuItemsResponse?.data?.items && Array.isArray(restaurantMenuItemsResponse.data.items) && restaurantMenuItemsResponse.data.items.length > 0) {
          console.log('✅ API Mode: Using existing API data', restaurantMenuItemsResponse.data.items.length, 'items');
          setMenuItemsData(restaurantMenuItemsResponse.data.items);
        } else if (restaurantMenuItemsResponse?.data && Array.isArray(restaurantMenuItemsResponse.data) && restaurantMenuItemsResponse.data.length > 0) {
          console.log('✅ API Mode: Using existing API data (direct array)', restaurantMenuItemsResponse.data.length, 'items');
          setMenuItemsData(restaurantMenuItemsResponse.data);
        }
      } else if (!restaurantMenuItemsLoading) {
        // Need to load API data but don't have it yet
      }
      // Don't set static data while in API mode
    } else {
      // Preview mode - always use static data
      console.log('📄 Preview Mode: Using menuData.js');
      setMenuItemsData(menuData.menuItems);
    }
  }, [
    restaurantMenuItemsResponse,
    restaurantMenuItemsLoading,
    location.search,
    setIdentifiers,
    restaurantId,
    tableId,
    isApiMode
  ]);

  // Maintain API mode state based on localStorage data
  useEffect(() => {
    const storedData = getStorageWithTTL();
    if (storedData && storedData.restaurantId && storedData.tableId && !isApiMode) {
      setIsApiMode(true);
    } else if (!storedData && isApiMode) {
      setIsApiMode(false);
    }
  }, [location.search, isApiMode]);
  const getCurrentMode = () => {
    // Check sources in order of priority: URL → localStorage → preview mode
    let restaurantId = null;
    let tableId = null;

    // 1. Check URL parameters first
    const urlParams = new URLSearchParams(location.search);
    const urlRestaurantId = urlParams.get('restaurant_id');
    const urlTableId = urlParams.get('table_id');

    if (urlRestaurantId && urlTableId) {
      restaurantId = urlRestaurantId;
      tableId = urlTableId;
    } else {
      // 2. Check localStorage if URL params not available
      const storedData = getStorageWithTTL();
      if (storedData && storedData.restaurantId && storedData.tableId) {
        restaurantId = storedData.restaurantId;
        tableId = storedData.tableId;
      }
    }

    // If we have API data loaded, we're in API mode regardless of source
    const hasApiData = Boolean(restaurantMenuItemsResponse?.data?.items?.length > 0 || restaurantMenuItemsResponse?.data?.length > 0);
    const currentIsApiMode = Boolean(restaurantId && tableId) || hasApiData;

    // Get categories based on mode - check localStorage first for API mode
    let categories = (menuData.categoriesApiResponse?.data || []).map((category, index) => ({
      id: category._id,
      _id: category._id,
      name: category.name,
      icon: getCategoryIcon(category.name, index),
      count: category.count ?? 0
    }));
    if (currentIsApiMode) {
      if (dynamicCategories && dynamicCategories.length > 0) {
        // Use currently loaded dynamic categories
        categories = dynamicCategories;
      } else {
        // Check localStorage for cached categories
        const storedData = getStorageWithTTL();
        if (storedData && storedData.categories) {
          categories = storedData.categories;
        } else {
          categories = (menuData.categoriesApiResponse?.data || []).map((category, index) => ({
            id: category._id,
            _id: category._id,
            name: category.name,
            icon: getCategoryIcon(category.name, index),
            count: category.count ?? 0
          }));
        }
      }
    }

    return {
      isApiMode: currentIsApiMode,
      categories: categories,
      dynamicCategories: dynamicCategories || [],
      categoriesForStatic: menuData.categoriesApiResponse,
      isLoadingCategories: currentIsApiMode && categoriesLoading,
      restaurantId,
      tableId
    };
  };

  // Filter menu items based on category and search
  useEffect(() => {
    let items = menuItemsData;
    const { isApiMode, categories } = getCurrentMode();

    // Filter by category
    if (selectedCategory !== 'all') {
      if (isApiMode) {
        // API mode - use API categories for filtering
        const categoryId = categories.find(cat =>
          cat.name.toLowerCase() === selectedCategory.toLowerCase()
        )?._id;

        if (categoryId) {
          if (items.length > 0) {
            // Try API data structure first
            if (items[0].productCategory !== undefined) {
              items = items.filter(item => item.productCategory === categoryId);
            } else if (items[0].categoryId !== undefined) {
              items = items.filter(item => item.categoryId === categoryId);
            } else {
            }
          }
        } else {
          // If no matching category found, return all items
          items = items.filter(item => true);
        }
      } else {
        // Static mode - use static categories for filtering
        console.log('🔍 Static Mode: Using static categories for filtering');
        const categoryId = menuData.categoriesApiResponse?.data?.find(cat =>
          cat.name.toLowerCase() === selectedCategory.toLowerCase()
        )?._id;

        if (categoryId) {
          if (items.length > 0) {
            // Try different data structures
            if (items[0].productCategory !== undefined) {
              items = items.filter(item => item.productCategory === categoryId);
            } else if (items[0].categoryId !== undefined) {
              items = items.filter(item => item.categoryId === categoryId);
            } else if (items[0].category !== undefined) {
              items = items.filter(item => item.category?.toLowerCase() === selectedCategory.toLowerCase());
            } else {
            }
          }
        } else {
          // If no matching category found, return all items
          items = items.filter(item => true);
        }
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      items = items.filter(item => {
        const name = item.itemName || item.name || '';
        const description = item.description || '';
        const tags = item.tags || [];
        const ingredients = item.ingredients || [];

        return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
          ingredients.some(ingredient => ingredient.toLowerCase().includes(searchQuery.toLowerCase()));
      });
    }

    setFilteredItems(items);
  }, [selectedCategory, searchQuery, menuItemsData]);

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCategoryChange = (categoryName) => {
    if (!categoryName) return;
    const normalized = categoryName.toLowerCase();
    setSelectedCategory(normalized);
    window.requestAnimationFrame(() => {
      const target = document.getElementById('menu-grid');
      if (!target) return;
      const offset = 270; // tweak to taste
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  };

  const handleShowcaseAdd = (item) => {
    if (!item) return;
    addToCart({
      id: item.id || item._id,
      name: item.name || item.itemName,
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
      message: `${item.name || item.itemName} is ready in your cart.`,
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

  useEffect(() => {
    if (!isInitializingFromUrl) {
      return;
    }

    if (restaurantLoading || tableLoading) {
      return;
    }

    if (restaurantResponse || restaurantError || (!tableId && !tableLoading)) {
      setIsInitializingFromUrl(false);
    }
  }, [isInitializingFromUrl, restaurantLoading, tableLoading, restaurantResponse, restaurantError, tableId]);

  const hasRestaurantParam = Boolean(new URLSearchParams(location.search).get('restaurant_id'));
  const hasTableParam = Boolean(new URLSearchParams(location.search).get('table_id'));
  const isLoadingIdentifiers = (hasRestaurantParam && hasTableParam) &&
    (restaurantLoading || tableLoading || (isInitializingFromUrl && !restaurantError && !restaurantResponse));

  return (
    <div className="digital-menu">
      {isLoadingIdentifiers ? (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
          <div className="relative flex flex-col items-center gap-10 rounded-[3rem] border border-white/[0.06] bg-white/[0.02] px-24 py-28 text-center backdrop-blur-3xl transition-all duration-1000 hover:bg-white/[0.03]">

            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-1.5 backdrop-blur-xl">
              <svg className="h-3 w-3 animate-spin text-white/60" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              <span className="text-[9px] font-bold tracking-[0.35em] text-white/50 uppercase">Processing</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-light tracking-tight">Setting your table</h1>
              <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </div>

            <p className="max-w-sm text-sm font-light leading-relaxed text-white/50">
              Preparing your personalized dining experience
            </p>

            <div className="relative h-16 w-16">
              <div className="absolute inset-0 animate-[spin_3s_linear_infinite] rounded-lg border-2 border-white/10"></div>
              <div className="absolute inset-2 animate-[spin_2s_linear_infinite_reverse] rounded-lg border-2 border-white/20"></div>
              <div className="absolute inset-4 animate-[spin_1.5s_linear_infinite] rounded-lg border-2 border-white/30"></div>
            </div>

            <div className="flex gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/40"></span>
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/40" style={{ animationDelay: '0.2s' }}></span>
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/40" style={{ animationDelay: '0.4s' }}></span>
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/40" style={{ animationDelay: '0.6s' }}></span>
            </div>
          </div>
        </div>


      ) : (
        <div className="menu-container max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <MenuNavbar restaurant={restaurantResponse?.data || menuData.restaurant} restaurantResponse={restaurantResponse} />

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

          <MenuHeader restaurant={restaurantResponse?.data || menuData.restaurant} stats={heroStats} restaurantResponse={restaurantResponse} />

          <MenuFilters
            categories={getCurrentMode().categories}
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
              restaurant={restaurantResponse?.data || menuData.restaurant}
            />
          )}

          <MenuHorizontalShowcase
            title="Explore quick picks"
            subtitle="A few popular bites you might enjoy"
            items={showcaseItems}
            onItemClick={handleProductClick}
            onAdd={handleShowcaseAdd}
            viewAllCategory="all"
          />
          <MenuHorizontalShowcase
            title="See Our Main Course items"
            subtitle="Get ready to savor the flavors of our main course"
            items={mainCourseItems}
            onItemClick={handleProductClick}
            onAdd={handleShowcaseAdd}
            viewAllCategory="main course"
          />
        </div>
      )}
    </div>
  )
}

export default DigitalMenu
