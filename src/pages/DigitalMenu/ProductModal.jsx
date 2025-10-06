import React, { useState } from 'react'
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext.jsx';

const ProductModal = ({ product, onClose, restaurant }) => {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const getDietaryBadges = () => {
    const badges = []
    if (product.isVeg) badges.push({ icon: '🟢', text: 'Vegetarian', color: 'green' })
    if (product.isVegan) badges.push({ icon: '🌱', text: 'Vegan', color: 'green' })
    if (product.isGlutenFree) badges.push({ icon: '🚫🌾', text: 'Gluten Free', color: 'blue' })
    return badges
  }

  const getSpiceLevel = () => {
    return '🌶️'.repeat(product.spiceLevel)
  }

  const getTotalPrice = () => {
    return product.price * quantity
  }

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > 10) return 10;
      return next;
    });
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      isVeg: product.isVeg,
      isVegan: product.isVegan,
      isGlutenFree: product.isGlutenFree,
      quantity: quantity,
    });
    addToast({
      type: 'success',
      title: 'Added to cart',
      message: `${quantity} × ${product.name} added to your cart`,
      position: 'bottom-right',
    });
    onClose();
  };

  return (
    <div className="modal-overlay fixed inset-0 bg-black/50 flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="product-modal bg-white rounded-xl sm:rounded-2xl max-w-lg sm:max-w-2xl lg:max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button className="close-btn absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors z-10" onClick={onClose}>✕</button>

        <div className="modal-content">
          {/* Product Image */}
          <div className="modal-image relative h-48 sm:h-56 md:h-64 lg:h-80 overflow-hidden rounded-t-xl sm:rounded-t-2xl">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="image-badges absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col gap-2">
              {product.isBestseller && (
                <span className="badge bestseller bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium">🏆 Bestseller</span>
              )}
              {getDietaryBadges().map((badge, index) => (
                <span key={index} className={`badge dietary ${badge.color} text-xs px-2 py-1 rounded-full font-medium`}>
                  {badge.icon} {badge.text}
                </span>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="modal-details p-4 sm:p-6 md:p-8">
            <div className="product-header flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
              <div className="flex-1">
                <h2 className="product-name text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
                <div className="price-section text-lg sm:text-xl font-semibold text-green-600">
                  {product.currency}{product.price}
                  {product.originalPrice && (
                    <span className="original-price ml-3 text-sm text-gray-400 line-through">{product.currency}{product.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>

            <p className="product-description text-sm sm:text-base text-gray-700 mb-6 leading-relaxed">{product.description}</p>

            {/* Product Meta Information */}
            <div className="product-meta-grid grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
              <div className="meta-item text-center">
                <span className="meta-label block text-xs text-gray-500 mb-1">⏱️ Prep Time</span>
                <span className="meta-value block font-semibold text-gray-900">{product.prepTime}</span>
              </div>
              <div className="meta-item text-center">
                <span className="meta-label block text-xs text-gray-500 mb-1">🔥 Calories</span>
                <span className="meta-value block font-semibold text-gray-900">{product.calories}</span>
              </div>
              {product.spiceLevel > 0 && (
                <div className="meta-item text-center">
                  <span className="meta-label block text-xs text-gray-500 mb-1">🌶️ Spice Level</span>
                  <span className="meta-value block font-semibold text-gray-900">{getSpiceLevel()}</span>
                </div>
              )}
              <div className="meta-item text-center">
                <span className="meta-label block text-xs text-gray-500 mb-1">⭐ Rating</span>
                <span className="meta-value block font-semibold text-gray-900">{product.rating} ({product.reviewCount})</span>
              </div>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="tags-section mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Tags:</h4>
                <div className="tags flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="tag bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Ingredients */}
            <div className="ingredients-section mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Ingredients:</h4>
              <p className="ingredients text-sm text-gray-600 leading-relaxed">{product.ingredients.join(', ')}</p>
            </div>

            {/* Allergens */}
            {product.allergens.length > 0 && (
              <div className="allergens-section mb-6">
                <h4 className="text-sm font-semibold text-red-600 mb-3">⚠️ Allergens:</h4>
                <p className="allergens text-sm text-red-600 leading-relaxed">{product.allergens.join(', ')}</p>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="order-section flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="quantity-selector flex items-center gap-3 bg-white border border-gray-300 rounded-lg px-3 py-2">
                <button
                  className="quantity-btn w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-lg font-semibold hover:bg-gray-50 transition-colors"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="quantity text-lg font-semibold min-w-[2rem] text-center">{quantity}</span>
                <button
                  className="quantity-btn w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-lg font-semibold hover:bg-gray-50 transition-colors"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </div>

              <button
                className="add-to-cart-btn flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={!product.isAvailable}
                onClick={handleAddToCart}
              >
                {product.isAvailable
                  ? `Add ${quantity} to Cart - ${product.currency}${getTotalPrice()}`
                  : 'Currently Unavailable'
                }
              </button>
            </div>

            {/* Quick Order Options */}
            <div className="quick-order flex flex-col sm:flex-row gap-3 mt-4">
              <button className="quick-order-btn flex-1 bg-green-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                📱 Order via WhatsApp
              </button>
              <button className="quick-order-btn flex-1 bg-blue-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                📞 Call {restaurant.phone}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
