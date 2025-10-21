import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRestaurantData } from '../../context/RestaurantDataContext.jsx';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext.jsx';
import { menuData } from '../../data/menuData.js';
import { TiArrowBackOutline } from 'react-icons/ti';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { restaurantMenuItemsResponse } = useRestaurantData();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [productId]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Use API response data if available
        let menuItems = [];
        if (restaurantMenuItemsResponse?.data?.items && Array.isArray(restaurantMenuItemsResponse.data.items) && restaurantMenuItemsResponse.data.items.length > 0) {
          menuItems = restaurantMenuItemsResponse.data.items;
        } else if (restaurantMenuItemsResponse?.data && Array.isArray(restaurantMenuItemsResponse.data) && restaurantMenuItemsResponse.data.length > 0) {
          menuItems = restaurantMenuItemsResponse.data;
        } else {
          // Fall back to static data for Preview Mode
          menuItems = menuData.menuItems;
        }

        // Find product - handle both API (_id) and static (id) data
        const foundProduct = menuItems.find(item => {
          const itemId = item._id || item.id;
          const matches = String(itemId) === productId;
          return matches;
        });

        if (foundProduct) {
          setProduct(foundProduct);
          setActiveImageIdx(0);
        } else {
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [productId, navigate, restaurantMenuItemsResponse]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = () => {
    const price = product.discountPrice || product.price || 0;
    addToCart({
      id: product.id || product._id,
      name: product.name || product.itemName,
      price: price,
      image: Array.isArray(product.image) ? product.image[0] : product.image || '/placeholder-image.jpg',
      category: product.category,
      isVeg: product.itemCategory === 'veg' || product.isVeg,
      isVegan: product.isVegan,
      isGlutenFree: product.isGlutenFree,
      quantity: quantity,
    });

    addToast({
      type: 'success',
      title: 'Added to cart',
      message: `${product.name || product.itemName} (${quantity}x) has been added to your cart`,
      position: 'bottom-right',
    });
  };

  const images = Array.isArray(product?.image) && product.image.length > 0
    ? product.image
    : [];

  const handlePrevImage = () => {
    if (!images.length) return;
    setActiveImageIdx(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    if (!images.length) return;
    setActiveImageIdx(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index) => {
    if (!images.length) return;
    setActiveImageIdx(index);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Back Button */}
        <div className="flex items-center justify-between mb-2 py-2 px-1 rounded-sm bg-gradient-to-br from-slate-100 to-slate-100">
        <button
          onClick={() => navigate(-1)}
          className="text-slate-600 hover:text-slate-800 transition-all duration-200 hover:translate-x-2 border border-black/20 rounded-full px-4 py-1"
        >
          <span className="font-medium flex items-center gap-2"><TiArrowBackOutline className='text-2xl'/><span>Back to Menu</span></span>
        </button>
        </div>
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200/60 overflow-hidden backdrop-blur-sm">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Product Gallery - Modern Layout */}
            <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 p-8 lg:p-12">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl bg-white">
                {images.length > 0 ? (
                  <img
                    src={images[activeImageIdx]}
                    alt={`${product.name || product.itemName} - Image ${activeImageIdx + 1}`}
                    className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                    <div className="text-center text-slate-500">
                      <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm font-medium">No image available</p>
                    </div>
                  </div>
                )}

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                    >
                      <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7m-7 7h18" />
                      </svg>
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                    >
                      <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7m-7 7h18" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                    {activeImageIdx + 1} / {images.length}
                  </div>
                )}

                {/* Bestseller Badge */}
                {product.isBestseller && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Bestseller
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="mt-6 grid grid-cols-4 gap-3">
                  {images.map((imgSrc, index) => (
                    <button
                      key={imgSrc}
                      onClick={() => handleThumbnailClick(index)}
                      className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                        index === activeImageIdx
                          ? 'border-blue-500 shadow-lg ring-2 ring-blue-500/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img
                        src={imgSrc}
                        alt={`${product.name || product.itemName} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Information - Enhanced Layout */}
            <div className="p-8 lg:p-12 bg-white">
              <div className="space-y-8">
                {/* Header Section */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                      {product.name || product.itemName}
                    </h1>
                    {product.itemCategory === 'veg' || product.isVeg ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                        🥬 Vegetarian
                      </span>
                    ) : product.itemCategory === 'non-veg' ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200">
                        🍗 Non-Vegetarian
                      </span>
                    ) : null}
                  </div>

                  <p className="text-lg text-slate-600 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Rating and Meta Info */}
                  <div className="flex flex-wrap items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-slate-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="font-semibold text-slate-900">{product.rating || 'N/A'}</span>
                      <span className="text-slate-500">({product.reviewCount || 0} reviews)</span>
                    </div>

                    {product.prepTime && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{product.prepTime}</span>
                      </div>
                    )}

                    {product.calories && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>{product.calories} cal</span>
                      </div>
                    )}

                    {product.spiceLevel > 0 && (
                      <div className="flex items-center gap-1">
                        {[...Array(3)].map((_, i) => (
                          <span key={i} className={i < product.spiceLevel ? 'text-red-500' : 'text-slate-300'}>
                            🌶️
                          </span>
                        ))}
                        <span className="text-sm text-slate-600 ml-1">{product.spiceLevel}/3</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Price Section */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <div className="flex items-baseline gap-4">
                    <span className="text-4xl font-bold text-slate-900">
                      {formatPrice(product.discountPrice || product.price)}
                    </span>
                    {product.originalPrice && product.originalPrice > (product.discountPrice || product.price) && (
                      <span className="text-xl text-slate-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                    {product.discountPrice && product.originalPrice && product.originalPrice > product.discountPrice && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        Save {formatPrice(product.originalPrice - product.discountPrice)}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 mt-2">Inclusive of all taxes</p>
                </div>

                {/* Ingredients */}
                {product.ingredients && product.ingredients.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Ingredients</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.ingredients.map((ingredient, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm font-medium transition-colors cursor-default"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add to Cart Section */}
                <div className="border-t border-slate-200 pt-8">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white shadow-sm">
                      <button
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        className="px-4 py-3 text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="px-6 py-3 font-semibold text-lg text-slate-900 min-w-[3rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(prev => prev + 1)}
                        className="px-4 py-3 text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-3"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5-5M17 19a2 2 0 100 4 2 2 0 000-4zM9 19a2 2 0 100 4 2 2 0 000-4z" />
                      </svg>
                      <span>Add to Cart • {formatPrice((product.discountPrice || product.price || 0) * quantity)}</span>
                    </button>

                    {/* Favorites Button */}
                    <button className="p-4 text-slate-400 hover:text-red-500 transition-colors rounded-xl border border-slate-200 hover:border-red-200 hover:bg-red-50">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
