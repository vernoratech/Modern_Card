// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { RestaurantDataProvider } from './context/RestaurantDataContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import ToastContainer from './components/ui/ToastContainer.jsx';
import { useToast } from './context/ToastContext.jsx';
import DigitalMenu from './pages/DigitalMenu/DigitalMenu';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import RestaurantAboutPage from './pages/About/RestaurantAboutPage.jsx';
import './App.css';

const ToastBootstrapper = () => {
  const { addToast } = useToast();

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('welcomeToastShown');
    if (!hasSeen) {
      addToast({
        type: 'info',
        title: 'Welcome to Brijesh Fast Food',
        message: 'Browse the menu and tap any dish to explore more or add to your cart.',
        position: 'top-center',
        duration: 6000,
      });
      sessionStorage.setItem('welcomeToastShown', 'true');
    }
  }, [addToast]);

  return null;
};

function App() {
  return (
    <ToastProvider>
      <ToastBootstrapper />
      <CartProvider>
        <RestaurantDataProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<DigitalMenu />} />
                <Route path="/product/:productId" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/about" element={<RestaurantAboutPage />} />
              </Routes>
              <ToastContainer />
            </div>
          </Router>
        </RestaurantDataProvider>
      </CartProvider>
    </ToastProvider>
  );
}

export default App;
