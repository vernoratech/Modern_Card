// src/components/DigitalMenu/ProductCard.jsx
import React from 'react'

const ProductCard = ({ product, viewMode, onClick }) => {
  const getDietaryBadges = () => {
    const badges = []
    if (product.isVeg) badges.push({ icon: '🟢', text: 'Veg' })
    if (product.isVegan) badges.push({ icon: '🌱', text: 'Vegan' })
    if (product.isGlutenFree) badges.push({ icon: '🚫🌾', text: 'Gluten Free' })
    return badges
  }

  const getSpiceLevel = () => {
    return '🌶️'.repeat(product.spiceLevel)
  }

  if (viewMode === 'list') {
    return (
      <div className="product-card list-view" onClick={onClick}>
        <div className="product-image">
          <img src={product.image} alt={product.name} />
          {product.isBestseller && <span className="badge bestseller">🏆 Bestseller</span>}
          {!product.isAvailable && <div className="unavailable-overlay">Unavailable</div>}
        </div>
        
        <div className="product-info">
          <div className="product-header">
            <h3 className="product-name">{product.name}</h3>
            <div className="dietary-badges">
              {getDietaryBadges().map((badge, index) => (
                <span key={index} className="dietary-badge" title={badge.text}>
                  {badge.icon}
                </span>
              ))}
            </div>
          </div>
          
          <p className="product-description">{product.description}</p>
          
          <div className="product-meta">
            <span className="prep-time">⏱️ {product.prepTime}</span>
            <span className="calories">🔥 {product.calories} cal</span>
            {product.spiceLevel > 0 && <span className="spice-level">{getSpiceLevel()}</span>}
            <span className="rating">⭐ {product.rating} ({product.reviewCount})</span>
          </div>

          <div className="product-tags">
            {product.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>
        
        <div className="product-price">
          <div className="price-info">
            <span className="current-price">{product.currency}{product.price}</span>
            {product.originalPrice && (
              <span className="original-price">{product.currency}{product.originalPrice}</span>
            )}
          </div>
          <button className="add-btn" disabled={!product.isAvailable}>
            {product.isAvailable ? '+ Add' : 'Unavailable'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="product-card grid-view" onClick={onClick}>
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        
        <div className="image-overlay">
          <div className="badges">
            {product.isBestseller && <span className="badge bestseller">🏆</span>}
            {getDietaryBadges().map((badge, index) => (
              <span key={index} className="badge dietary" title={badge.text}>
                {badge.icon}
              </span>
            ))}
          </div>
          
          {product.tags.length > 0 && (
            <div className="tags">
              {product.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
        
        {!product.isAvailable && <div className="unavailable-overlay">Currently Unavailable</div>}
      </div>
      
      <div className="product-content">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-meta">
          <span className="prep-time">⏱️ {product.prepTime}</span>
          <span className="calories">🔥 {product.calories} cal</span>
          {product.spiceLevel > 0 && <span className="spice-level">{getSpiceLevel()}</span>}
        </div>
        
        <div className="rating-section">
          <span className="rating">⭐ {product.rating}</span>
          <span className="review-count">({product.reviewCount} reviews)</span>
        </div>
        
        <div className="product-footer">
          <div className="price-info">
            <span className="current-price">{product.currency}{product.price}</span>
            {product.originalPrice && (
              <span className="original-price">{product.currency}{product.originalPrice}</span>
            )}
          </div>
          
          <button 
            className={`add-btn ${product.isAvailable ? 'available' : 'unavailable'}`}
            disabled={!product.isAvailable}
          >
            {product.isAvailable ? '+ Add to Cart' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
