import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { items, total, itemCount, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';

    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    // Payment validation for card
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
      if (!formData.nameOnCard.trim()) newErrors.nameOnCard = 'Name on card is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear cart and redirect to success page
      const orderDetails = {
        orderId: `ORD-${Date.now().toString().slice(-6)}`,
        placedAt: Date.now(),
        totals: {
          subtotal,
          deliveryFee,
          tax,
          finalTotal,
        },
        items,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        paymentMethod: formData.paymentMethod,
      };

      clearCart();
      navigate('/order-confirmation', { state: orderDetails });
    } catch (error) {
      console.error('Order submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2 className="empty-cart-title">Your cart is empty</h2>
            <p className="empty-cart-message">
              Add some items to your cart before checking out.
            </p>
            <Link to="/" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = total;
  const deliveryFee = subtotal >= 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const finalTotal = subtotal + deliveryFee + tax;

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1 className="checkout-title">Checkout</h1>
          <p className="checkout-subtitle">Complete your order</p>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="checkout-content">
            {/* Customer Information */}
            <div className="checkout-section">
              <h2 className="section-title">Contact Information</h2>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="fullName" className="form-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={`form-input ${errors.fullName ? 'error' : ''}`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="checkout-section">
              <h2 className="section-title">Payment Method</h2>

              <div className="payment-methods">
                <label className="payment-method">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                  />
                  <span className="payment-method-label">UPI/Credit/Debit Card</span>
                </label>

                {/* <label className="payment-method">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                  />
                  <span className="payment-method-label">PayPal</span>
                </label> */}

                <label className="payment-method">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                  />
                  <span className="payment-method-label">Call The Waiter & Pay Later</span>
                </label>
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="card-form">
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label htmlFor="nameOnCard" className="form-label">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        id="nameOnCard"
                        value={formData.nameOnCard}
                        onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                        className={`form-input ${errors.nameOnCard ? 'error' : ''}`}
                        placeholder="Enter name as shown on card"
                      />
                      {errors.nameOnCard && <span className="error-message">{errors.nameOnCard}</span>}
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="cardNumber" className="form-label">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        className={`form-input ${errors.cardNumber ? 'error' : ''}`}
                        placeholder="1234 5678 9012 3456"
                      />
                      {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="expiryDate" className="form-label">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        className={`form-input ${errors.expiryDate ? 'error' : ''}`}
                        placeholder="MM/YY"
                      />
                      {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="cvv" className="form-label">
                        CVV *
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        className={`form-input ${errors.cvv ? 'error' : ''}`}
                        placeholder="123"
                      />
                      {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="order-summary">
            <h2 className="summary-title">Order Summary</h2>

            <div className="order-items">
              {items.map((item) => (
                <div key={item.id} className="order-item">
                  <div className="order-item-image">
                    <img src={item.image} alt={item.name} loading="lazy" />
                  </div>
                  <div className="order-item-details">
                    <h4 className="order-item-name">{item.name}</h4>
                    <p className="order-item-quantity">Qty: {item.quantity}</p>
                  </div>
                  <div className="order-item-price">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="order-totals">
              <div className="order-total-row">
                <span className="total-label">Subtotal</span>
                <span className="total-value">{formatPrice(subtotal)}</span>
              </div>

              <div className="order-total-row">
                <span className="total-label">Delivery Fee</span>
                <span className="total-value">
                  {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                </span>
              </div>

              <div className="order-total-row">
                <span className="total-label">Tax</span>
                <span className="total-value">{formatPrice(tax)}</span>
              </div>

              <div className="order-total-row final-total">
                <span className="total-label">Total</span>
                <span className="total-value">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {deliveryFee === 0 && (
              <div className="free-delivery-badge">
                🎉 Free delivery included!
              </div>
            )}

            <button
              type="submit"
              className="place-order-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : `Place Order - ${formatPrice(finalTotal)}`}
            </button>

            <Link to="/cart" className="back-to-cart-btn">
              Back to Cart
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
