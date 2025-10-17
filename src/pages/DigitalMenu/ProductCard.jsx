// src/pages/DigitalMenu/ProductCard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext.jsx';

const ProductCard = ({ product, viewMode = 'grid', onProductClick }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const getDietaryBadges = () => {
    const badges = [];

    // Check itemCategory field (from API) first, then fall back to boolean fields
    if (product.itemCategory === 'veg' || product.isVeg) {
      badges.push({ icon: '🌱', text: 'Veg', color: 'bg-green-100 text-green-800' });
    } else if (product.itemCategory === 'non-veg') {
      badges.push({ icon: '🍗', text: 'Non-Veg', color: 'bg-red-100 text-red-800' });
    }

    // Keep existing badges for vegan and gluten-free
    if (product.isVegan) badges.push({ icon: '🌿', text: 'Vegan', color: 'bg-teal-100 text-teal-800' });
    if (product.isGlutenFree) badges.push({ icon: '🌾', text: 'GF', color: 'bg-amber-100 text-amber-800' });
    if (product.isBestseller) badges.push({ icon: '⭐', text: 'Bestseller', color: 'bg-yellow-100 text-yellow-800' });

    return badges;
  };

  const getSpiceLevel = () => {
    if (!product.spiceLevel) return null;
    return (
      <span className="flex items-center" title={`Spice Level: ${product.spiceLevel}/3`}>
        {Array.from({ length: 3 }).map((_, index) => (
          <span
            key={index}
            className={index < product.spiceLevel ? 'text-red-500' : 'text-gray-300'}
          >
            🌶️
          </span>
        ))}
      </span>
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      id: product.id || product._id,
      name: product.name || product.itemName,
      price: product.price,
      image: product.image?.[0] || '/placeholder-image.jpg',
      category: product.category,
      isVeg: product.isVeg,
      isVegan: product.isVegan,
      isGlutenFree: product.isGlutenFree,
      quantity: 1,
    });
    addToast({
      type: 'success',
      title: 'Added to cart',
      message: `${product.name || product.itemName} has been added to your cart`,
      position: 'bottom-right',
    });
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate(`/product/${product.id || product._id}`);
  };

  const renderActions = () => (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      <button
        type="button"
        onClick={handleViewDetails}
        className="flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 sm:px-4 sm:py-2 sm:text-sm"
      >
        <span>View Details</span>
        <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={handleAddToCart}
        className="flex items-center gap-1 rounded-full bg-green-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-green-700 sm:px-4 sm:py-2 sm:text-sm"
      >
        <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5-5M17 19a2 2 0 100 4 2 2 0 000-4zM9 19a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
        <span>Add to Cart</span>
      </button>
    </div>
  );

  const handleNavigate = () => {
    if (onProductClick) {
      onProductClick(product);
    } else {
      navigate(`/product/${product.id || product._id}`);
    }
  };

  const renderBadges = () => {
    const badges = getDietaryBadges();
    if (!badges.length) return null;

    return (
      <div className="dietary-badges absolute top-3 left-3">
        {badges.map((badge, index) => (
          <span
            key={`${badge.text}-${index}`}
            className={`dietary-badge ${badge.color}`}
            title={badge.text}
          >
            <span>{badge.icon}</span>
            <span className="badge-text">{badge.text}</span>
          </span>
        ))}
      </div>
    );
  };

  const renderTags = () => {
    if (!product.tags?.length) return null;

    return (
      <div className="tag-badges absolute bottom-3 right-3">
        {product.tags.slice(0, 2).map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className="tag-badge bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    );
  };

  const renderOverlay = () => {
    if (product.isAvailable === false || product.isActive === 0) {
      return (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-xl">
          <span className="text-white font-medium text-lg">Currently Unavailable</span>
        </div>
      );
    }
  };

  const renderRating = () => (
    <div className="flex items-center">
      <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <span className="font-medium text-gray-900">{product.rating}</span>
      <span className="text-gray-400 ml-1">({product.reviewCount || 0})</span>
    </div>
  );

  const renderListContent = () => (
    <div
      className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col md:flex-row cursor-pointer"
      onClick={handleNavigate}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* <div className="relative w-full h-44 xs:h-48 sm:h-52 md:h-auto md:w-48 lg:w-56 flex-shrink-0">
        <img
          src={Array.isArray(product.image) ? product.image[0] : product.image || '/placeholder-image.jpg'}
          alt={product.name || product.itemName}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          loading="lazy"
        />
        {renderBadges()}
        {renderOverlay()}
      </div> */}

      <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex-1 flex flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight line-clamp-2">{product.name || product.itemName}</h3>
            <p className="text-sm sm:text-base text-gray-600 line-clamp-3 sm:line-clamp-2">{product.description}</p>
          </div>
          <div className="text-left sm:text-right flex-shrink-0">
            <div className="font-bold text-base sm:text-lg text-gray-900">{formatPrice(product.price)}</div>
            {product.originalPrice && (
              <div className="text-xs sm:text-sm text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>
        </div>

        <div className="pt-1 sm:pt-2">
          {renderActions()}
        </div>

        <div className="mt-auto pt-3 border-t border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-gray-500">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <span className="flex items-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {product.prepTime}
              </span>
              {product.calories && (
                <span className="flex items-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {product.calories} cal
                </span>
              )}
              {getSpiceLevel()}
            </div>

            {renderRating()}
          </div>
        </div>
      </div>
    </div>
  );

  const renderGridContent = () => (
    <div
      className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full cursor-pointer"
      onClick={handleNavigate}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden pt-[68%] xs:pt-[72%] sm:pt-[75%] md:pt-[70%] lg:pt-[68%]">
        <img
          src={Array.isArray(product.image) ? product.image[0] : product.image || '/placeholder-image.jpg'}
          alt={product.name || product.itemName}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          loading="lazy"
        />
        {renderBadges()}
        {renderTags()}
        {renderOverlay()}
      </div>

      <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex-1 flex flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg line-clamp-2 flex-1 min-w-0">{product.name || product.itemName}</h3>
          <div className="flex-shrink-0 text-left sm:text-right">
            <div className="font-bold text-sm sm:text-base md:text-lg text-gray-900">{formatPrice(product.discountPrice)}</div>
            {product.originalPrice && (
              <div className="text-xs sm:text-sm text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 sm:line-clamp-2">{product.description}</p>

        <div className="pt-1 sm:pt-2">
          {renderActions()}
        </div>

        <div className="mt-auto pt-3 border-t border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-gray-500">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="flex items-center">
                <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 mr-0.5 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {product.prepTime}
              </span>
              {product.calories && (
                <span className="flex items-center">
                  <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 mr-0.5 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {product.calories} cal
                </span>
              )}
              {getSpiceLevel()}
            </div>

            {renderRating()}
          </div>
        </div>
      </div>
    </div>
  );

  return viewMode === 'list' ? renderListContent() : renderGridContent();
};

export default ProductCard;
