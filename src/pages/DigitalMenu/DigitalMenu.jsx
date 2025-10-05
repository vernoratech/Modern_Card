// src/pages/DigitalMenu/DigitalMenu.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { menuData } from '../../data/menuData.js';
import MenuHeader from './MenuHeader.jsx';
import MenuFilters from './MenuFilters.jsx';
import MenuGrid from './MenuGrid.jsx';
import ProductModal from './ProductModal.jsx';
import MenuNavbar from './MenuNavbar.jsx';
import './DigitalMenu.css';
import { fetchRestaurantMenuById, fetchTableDetails } from '../../services/restaurantService.js';

const DigitalMenu = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [filteredItems, setFilteredItems] = useState(menuData.menuItems)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [restaurantResponse, setRestaurantResponse] = useState(null)
  const [restaurantError, setRestaurantError] = useState(null)
  const [tableResponse, setTableResponse] = useState(null)
  const [tableError, setTableError] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const rawRestaurantId = params.get('restaurant_id');
    const rawTableId = params.get('table_id');

    if (!rawRestaurantId) {
      return;
    }

    const decodedRestaurantId = decodeURIComponent(rawRestaurantId);
    const normalizedRestaurantId = decodedRestaurantId.split('/')[0];

    const decodedTableId = rawTableId ? decodeURIComponent(rawTableId) : null;
    const normalizedTableId = decodedTableId ? decodedTableId.split('/').pop() : null;

    if (!normalizedRestaurantId) {
      console.warn('Unable to derive restaurant id from query params:', rawRestaurantId);
      return;
    }

    const fetchRestaurantData = async () => {
      try {
        const apiResponse = await fetchRestaurantMenuById(normalizedRestaurantId);
        setRestaurantResponse(apiResponse);
        setRestaurantError(null);
      } catch (error) {
        setRestaurantError(error);
      }
    };

    fetchRestaurantData();

    if (normalizedTableId) {
      const fetchTableData = async () => {
        try {
          const apiResponse = await fetchTableDetails(normalizedRestaurantId, normalizedTableId);
          setTableResponse(apiResponse);
          setTableError(null);
        } catch (error) {
          setTableError(error);
        }
      };

      fetchTableData();
    } else {
      setTableResponse(null);
      setTableError(null);
    }
  }, [location.search]);

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
      console.error('Error fetching table data:', tableError);
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
        <MenuNavbar restaurant={menuData.restaurant} restaurantResponse={restaurantResponse}/>

        {tableResponse?.data && (
          <section className="mt-4 mb-6 rounded-2xl border border-sky-500/20 bg-sky-500/10 p-4 sm:p-6 text-slate-900 shadow-sm backdrop-blur-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sky-700 shadow-sm">
                  <span>Table #{tableResponse.data.tableNumber}</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-500">
                    {tableResponse.data.location}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-slate-900 sm:text-xl md:text-2xl">
                  Reserved table details
                </h2>
                <p className="text-sm text-slate-600">
                  Seating capacity for {tableResponse.data.capacity} guests · Status: <span className="font-semibold capitalize">{tableResponse.data.status}</span>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-white/80 px-4 py-3 text-center shadow">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Capacity</p>
                  <p className="text-lg font-semibold text-slate-900">{tableResponse.data.capacity}</p>
                </div>
                <div className="rounded-xl bg-white/80 px-4 py-3 text-center shadow">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Status</p>
                  <p className={`text-lg font-semibold capitalize ${tableResponse.data.status === 'available' ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {tableResponse.data.status}
                  </p>
                </div>
                <div className="rounded-xl bg-white/80 px-4 py-3 text-center shadow">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Reserved</p>
                  <p className={`text-lg font-semibold ${tableResponse.data.reservedStatus ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {tableResponse.data.reservedStatus ? 'Yes' : 'No'}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        <MenuHeader restaurant={menuData.restaurant} stats={heroStats} restaurantResponse={restaurantResponse}/>

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
