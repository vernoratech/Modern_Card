// src/components/DigitalMenu/ProductModal.jsx
import React, { useState } from 'react'

const ProductModal = ({ product, onClose, restaurant }) => {
  const [quantity, setQuantity] = useState(1)

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

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        
        <div className="modal-content">
          {/* Product Image */}
          <div className="modal-image">
            <img src={product.image} alt={product.name} />
            <div className="image-badges">
              {product.isBestseller && (
                <span className="badge bestseller">🏆 Bestseller</span>
              )}
              {getDietaryBadges().map((badge, index) => (
                <span key={index} className={`badge dietary ${badge.color}`}>
                  {badge.icon} {badge.text}
                </span>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div className="modal-details">
            <div className="product-header">
              <h2 className="product-name">{product.name}</h2>
              <div className="price-section">
                <span className="current-price">{product.currency}{product.price}</span>
                {product.originalPrice && (
                  <span className="original-price">{product.currency}{product.originalPrice}</span>
                )}
              </div>
            </div>
            
            <p className="product-description">{product.description}</p>
            
            {/* Product Meta Information */}
            <div className="product-meta-grid">
              <div className="meta-item">
                <span className="meta-label">⏱️ Prep Time</span>
                <span className="meta-value">{product.prepTime}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">🔥 Calories</span>
                <span className="meta-value">{product.calories}</span>
              </div>
              {product.spiceLevel > 0 && (
                <div className="meta-item">
                  <span className="meta-label">🌶️ Spice Level</span>
                  <span className="meta-value">{getSpiceLevel()}</span>
                </div>
              )}
              <div className="meta-item">
                <span className="meta-label">⭐ Rating</span>
                <span className="meta-value">{product.rating} ({product.reviewCount} reviews)</span>
              </div>
            </div>
            
            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="tags-section">
                <h4>Tags:</h4>
                <div className="tags">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Ingredients */}
            <div className="ingredients-section">
              <h4>Ingredients:</h4>
              <p className="ingredients">{product.ingredients.join(', ')}</p>
            </div>
            
            {/* Allergens */}
            {product.allergens.length > 0 && (
              <div className="allergens-section">
                <h4>⚠️ Allergens:</h4>
                <p className="allergens">{product.allergens.join(', ')}</p>
              </div>
            )}
            
            {/* Quantity and Add to Cart */}
            <div className="order-section">
              <div className="quantity-selector">
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="quantity">{quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </div>
              
              <button 
                className="add-to-cart-btn"
                disabled={!product.isAvailable}
              >
                {product.isAvailable 
                  ? `Add ${quantity} to Cart - ${product.currency}${getTotalPrice()}`
                  : 'Currently Unavailable'
                }
              </button>
            </div>
            
            {/* Quick Order Options */}
            <div className="quick-order">
              <button className="quick-order-btn whatsapp">
                📱 Order via WhatsApp
              </button>
              <button className="quick-order-btn call">
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
