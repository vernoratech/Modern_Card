import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { items, total, itemCount, removeFromCart, updateQuantity, clearCart } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, newQuantity);
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-nav">
            <Link to="/" className="cart-back-btn">
              <span aria-hidden="true">←</span>
              <span>Back to Menu</span>
            </Link>
          </div>
          <div className="cart-header">
            <h1 className="cart-title">Shopping Cart</h1>
            <p className="cart-subtitle">Your cart is empty</p>
          </div>

          <div className="empty-cart">
            <div className="empty-cart-icon">
              🛒
            </div>
            <h2 className="empty-cart-title">No items in cart</h2>
            <p className="empty-cart-message">
              Start adding some delicious items to your cart!
            </p>
            <Link to="/" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-nav">
          <Link to="/" className="cart-back-btn">
            <span aria-hidden="true">←</span>
            <span>Back to Menu</span>
          </Link>
        </div>

        <div className="cart-header">
          <div className="cart-header-content">
            <h1 className="cart-title">Shopping Cart</h1>
            <p className="cart-count">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
          </div>
          <button
            onClick={clearCart}
            className="clear-cart-btn"
          >
            Clear Cart
          </button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} loading="lazy" />
                </div>

                <div className="cart-item-content">
                  <div className="cart-item-header">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="cart-item-details">
                    <div className="cart-item-meta">
                      <span className="cart-item-category">{item.category}</span>
                      {item.isVeg && <span className="dietary-badge veg">🟢 Veg</span>}
                      {item.isVegan && <span className="dietary-badge vegan">🌱 Vegan</span>}
                      {item.isGlutenFree && <span className="dietary-badge gluten-free">🚫🌾 GF</span>}
                    </div>

                    <div className="cart-item-controls">
                      <div className="quantity-controls">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="quantity-btn"
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="quantity-btn"
                          disabled={item.quantity >= 10}
                        >
                          +
                        </button>
                      </div>

                      <div className="cart-item-pricing">
                        <div className="cart-item-price">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="cart-item-unit-price">
                            {formatPrice(item.price)} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-summary-header">
              <h2 className="summary-title">Order Summary</h2>
            </div>

            <div className="summary-details">
              <div className="summary-row">
                <span className="summary-label">Subtotal ({itemCount} items)</span>
                <span className="summary-value">{formatPrice(total)}</span>
              </div>

              <div className="summary-row">
                <span className="summary-label">Delivery Fee</span>
                <span className="summary-value">
                  {total >= 50 ? formatPrice(0) : formatPrice(5.99)}
                </span>
              </div>

              <div className="summary-row">
                <span className="summary-label">Tax</span>
                <span className="summary-value">
                  {formatPrice(total * 0.08)}
                </span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row total-row">
                <span className="summary-label total-label">Total</span>
                <span className="summary-value total-value">
                  {formatPrice(
                    total +
                    (total >= 50 ? 0 : 5.99) +
                    (total * 0.08)
                  )}
                </span>
              </div>
            </div>

            <div className="cart-actions">
              <Link to="/" className="continue-shopping-btn">
                Continue Shopping
              </Link>
              <Link to="/checkout" className="checkout-btn">
                Proceed to Checkout
              </Link>
            </div>

            {total >= 50 && (
              <div className="free-delivery-notice">
                🎉 Free delivery! You've saved $5.99
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
