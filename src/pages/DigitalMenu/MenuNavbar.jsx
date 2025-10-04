import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useState, useEffect } from 'react';

const MenuNavbar = ({ restaurant }) => {
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = isScrolled ? 80 : 100; // Account for sticky navbar
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 mx-auto flex w-full max-w-7xl items-center justify-between gap-2 rounded-none border-b border-white/10 bg-slate-900/95 px-3 py-3 text-white shadow-lg backdrop-blur-md transition-all duration-300 sm:px-4 sm:py-3 md:mt-6 md:rounded-2xl md:border md:px-6 ${
        isScrolled ? 'md:py-2.5 lg:py-3' : 'md:py-4'
      }`}
    >
      {/* Logo and Brand */}
      <button
        type="button"
        onClick={() => navigate('/menu')}
        className="flex items-center gap-2 transition-opacity hover:opacity-80 sm:gap-3"
      >
        <img
          src={restaurant.logo}
          alt={restaurant.name}
          loading="lazy"
          className={`rounded-lg border border-white/15 object-cover shadow-md transition-all duration-300 sm:rounded-xl ${
            isScrolled ? 'h-8 w-8 sm:h-10 sm:w-10' : 'h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14'
          }`}
        />
        <div className="flex flex-col text-left">
          <span className={`text-[9px] uppercase tracking-widest text-slate-300/70 transition-all duration-300 sm:text-[10px] ${
            isScrolled ? 'hidden sm:block' : 'block'
          }`}>
            Modern Dining
          </span>
          <h1 className={`font-semibold leading-tight transition-all duration-300 ${
            isScrolled ? 'text-xs sm:text-sm md:text-base' : 'text-sm sm:text-base md:text-lg'
          }`}>
            {restaurant.name}
          </h1>
        </div>
      </button>

      {/* Desktop Navigation Links */}
      <div className={`hidden items-center gap-1 text-xs font-medium text-slate-100 transition-all duration-300 sm:text-sm md:flex ${
        isScrolled ? 'lg:flex' : 'md:flex'
      }`}>
        <button
          type="button"
          onClick={() => scrollTo('menu-hero')}
          className="rounded-full px-2 py-1 transition hover:bg-white/10 sm:px-3 sm:py-1.5"
        >
          Overview
        </button>
        <button
          type="button"
          onClick={() => scrollTo('menu-filters')}
          className="rounded-full px-2 py-1 transition hover:bg-white/10 sm:px-3 sm:py-1.5"
        >
          Menu
        </button>
        <button
          type="button"
          onClick={() => scrollTo('menu-grid')}
          className="rounded-full px-2 py-1 transition hover:bg-white/10 sm:px-3 sm:py-1.5"
        >
          Dishes
        </button>
        <button
          type="button"
          onClick={() => scrollTo('contact-section')}
          className="rounded-full px-2 py-1 transition hover:bg-white/10 sm:px-3 sm:py-1.5"
        >
          Contact
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={() => navigate('/cart')}
          className={`relative rounded-full border border-white/20 px-2 py-1.5 text-xs font-semibold text-white transition hover:border-white/40 hover:bg-white/5 sm:px-3 sm:py-2 sm:text-sm ${
            isScrolled ? 'hidden sm:flex md:flex' : 'hidden md:flex lg:flex'
          }`}
        >
          <svg className="w-3 h-3 mr-1 sm:w-4 sm:h-4 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5-5M17 19a2 2 0 100 4 2 2 0 000-4zM9 19a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          Cart
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold sm:w-5 sm:h-5 sm:text-xs">
              {itemCount > 9 ? '9+' : itemCount}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => navigate('/cart')}
          className={`rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 font-semibold text-slate-900 transition hover:from-cyan-300 hover:to-indigo-400 ${
            isScrolled ? 'px-2 py-1 text-[10px] sm:px-3 sm:py-1.5 sm:text-xs md:px-4 md:py-2 md:text-sm' : 'px-3 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm'
          }`}
        >
          View Cart
          {itemCount > 0 && (
            <span className="ml-2 inline-flex h-4 min-w-[1.25rem] items-center justify-center rounded-full bg-white/90 px-2 text-[9px] font-bold text-slate-900 shadow sm:h-5 sm:min-w-[1.5rem] sm:text-xs">
              {itemCount > 9 ? '9+' : itemCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default MenuNavbar;