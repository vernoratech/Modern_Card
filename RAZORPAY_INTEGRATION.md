# Razorpay Integration Documentation

## Overview
This document describes the Razorpay payment integration implemented for the Modern Card Restaurant application.

## Files Modified/Created

### 1. `/src/utils/razorpay.js`
- **Purpose**: Core Razorpay utility functions
- **Functions**:
  - `loadRazorpaySDK()`: Dynamically loads Razorpay SDK
  - `getRazorpayConfig()`: Gets Razorpay configuration
  - `createRazorpayOrder()`: Creates payment order (currently simulated)
  - `initializeRazorpayPayment()`: Initializes payment flow
  - `verifyPayment()`: Verifies payment (currently simulated)

### 2. `/src/config/payment.js`
- **Purpose**: Payment configuration management
- **Features**:
  - Static configuration (current implementation)
  - Dynamic configuration setup (for future API integration)
  - Environment variable validation
  - Easy switching between static/dynamic modes

### 3. `/src/pages/Checkout/Checkout.jsx` (Modified)
- **Changes Required**:
  - Import Razorpay utilities
  - Add payment processing state
  - Add `handleRazorpayPayment()` function
  - Update `handleSubmit()` to use Razorpay for card payments
  - Add error display
  - Update button text based on payment method

### 4. `/src/pages/Checkout/Checkout.css` (Modified)
- **Added**: Payment error styling (`.payment-error`)

## Environment Variables
```env
VITE_APP_RAZORPAY_KEY_ID=rzp_test_1bgvvBixZoMsmo
VITE_APP_RAZORPAY_KEY_SECRET=633FdqRTuoXA6KLGvaccmkqI
```

## How It Works

### Current Implementation (Static)
1. User selects "UPI/Credit/Debit Card" payment method
2. Fills in contact information
3. Clicks "Pay via Razorpay" button
4. Razorpay SDK loads dynamically
5. Payment modal opens with order details
6. User completes payment
7. Payment is verified (simulated)
8. Order is created and user redirected to confirmation

### Payment Flow
```
Checkout Form → Razorpay Modal → Payment Success → Order Confirmation
```

## Future Enhancements (Dynamic Mode)

### To Switch to Dynamic Mode:
1. Change `PAYMENT_MODE` in `/src/config/payment.js` to `'dynamic'`
2. Implement backend API endpoints:
   - `POST /api/payments/create-order`
   - `POST /api/payments/verify`
   - `GET /api/payments/config`

### Backend Integration Points:
- **Order Creation**: Replace simulated order creation with actual API call
- **Payment Verification**: Implement server-side verification using Razorpay webhooks
- **Configuration**: Fetch payment settings from database/API

## Testing

### Test Cards (Razorpay Test Mode):
- **Success**: 4111 1111 1111 1111
- **Failure**: 4000 0000 0000 0002
- **CVV**: Any 3 digits
- **Expiry**: Any future date

### UPI Testing:
- Use test UPI ID: `success@razorpay`

## Security Considerations

1. **API Keys**: 
   - Key ID is safe to expose in frontend
   - Key Secret should NEVER be used in frontend (currently only for reference)
   
2. **Payment Verification**:
   - Always verify payments on server-side
   - Use Razorpay webhooks for real-time updates
   - Implement signature verification

3. **Order Management**:
   - Generate unique order IDs
   - Store payment status in database
   - Handle payment failures gracefully

## Configuration Management

### Static to Dynamic Migration:
```javascript
// Current (Static)
const config = PAYMENT_CONFIG.static;

// Future (Dynamic)
const config = await getPaymentConfig();
```

### Customizable Settings:
- Company name and logo
- Theme colors
- Currency
- Delivery fees
- Tax rates
- Free delivery thresholds

## Error Handling

The implementation includes comprehensive error handling:
- SDK loading failures
- Payment cancellation
- Network errors
- Configuration errors
- Validation errors

## Browser Compatibility

Razorpay SDK supports:
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Support

For Razorpay-specific issues:
- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay Support](https://razorpay.com/support/)

For implementation issues:
- Check browser console for errors
- Verify environment variables
- Test with Razorpay test credentials
