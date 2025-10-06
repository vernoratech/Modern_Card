// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { RestaurantDataProvider } from './context/RestaurantDataContext.jsx';
import DigitalMenu from './pages/DigitalMenu/DigitalMenu';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import RestaurantAboutPage from './pages/About/RestaurantAboutPage.jsx';
import './App.css';

function App() {
  return (
    <CartProvider>
      <RestaurantDataProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<DigitalMenu />} />
              <Route path="/menu" element={<DigitalMenu />} />
              <Route path="/product/:productId" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<RestaurantAboutPage />} />
            </Routes>
          </div>
        </Router>
      </RestaurantDataProvider>
    </CartProvider>
  );
}

export default App;
