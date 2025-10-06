import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useState, useEffect } from 'react';
import { FaBowlFood } from 'react-icons/fa6';

const MenuNavbar = ({ restaurant, restaurantResponse }) => {
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const isPreviewMode = !restaurantResponse?.data;
  const responseData = restaurantResponse?.data ?? {};
  const displayCuisine = responseData.cuisine ?? restaurant?.cuisine ?? 'Chinese';
  const displayName = responseData.restaurantName ?? restaurant?.name ?? 'Brijesh fast food';
  const displayLogo = responseData.logoUrl ?? restaurant?.logo;

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

  const closeMobileMenu = () => setIsMobileNavOpen(false);

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
    closeMobileMenu();
  }

  const handleNavigate = (path) => {
    navigate(path);
    closeMobileMenu();
  };

  const handleMobileMenuToggle = () => setIsMobileNavOpen((prev) => !prev);

  const navLinks = [
    { key: 'overview', label: 'Overview', helper: 'Hero', mode: 'scroll', target: 'menu-hero' },
    { key: 'menu', label: 'Menu', helper: 'Filters', mode: 'scroll', target: 'menu-filters' },
    { key: 'dishes', label: 'Dishes', helper: 'List', mode: 'scroll', target: 'menu-grid' },
    { key: 'contact', label: 'Contact', helper: 'Reach us', mode: 'scroll', target: 'contact-section' },
    { key: 'about', label: 'About', helper: 'Profile', mode: 'route', path: '/about' }
  ];

  const handleNavLinkClick = (link) => {
    if (link.mode === 'scroll') {
      scrollTo(link.target);
      return;
    }
    if (link.mode === 'route' && link.path) {
      handleNavigate(link.path);
    }
  };

  return (
    <>
      {isMobileNavOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm transition md:hidden"
        />
      )}
      <nav
        className={`sticky top-0 z-50 mx-auto flex w-full max-w-7xl items-center justify-between gap-2 rounded-none border-b border-white/10 bg-gradient-to-r from-slate-950/95 via-slate-900/90 to-slate-950/95 px-3 py-3 text-white shadow-xl backdrop-blur-xl transition-all duration-300 sm:px-4 sm:py-3 md:mt-6 md:rounded-2xl md:border md:border-white/5 md:px-6 ${
          isScrolled ? 'md:py-2.5 lg:py-3' : 'md:py-4'
        }`}
      >
      {/* Logo and Brand */}
      <button
        type="button"
        onClick={() => handleNavigate('/')}
        className="flex items-center gap-2 transition-opacity hover:opacity-80 sm:gap-3"
      >
        <img
          src={displayLogo}
          alt={displayName}
          loading="lazy"
          className={`rounded-lg border border-white/15 object-cover shadow-md transition-all duration-300 sm:rounded-xl ${
            isScrolled ? 'h-8 w-8 sm:h-10 sm:w-10' : 'h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14'
          }`}
        />
        <div className="flex flex-col text-left">
          <span className={`text-[9px] uppercase tracking-widest text-slate-300/70 transition-all duration-300 sm:text-[10px] ${
            isScrolled ? 'hidden sm:block' : 'block'
          }`}>
            <span className="flex items-center gap-1">
              {displayCuisine}
              {isPreviewMode && (
                <span className="hidden rounded-full border border-sky-400/40 bg-sky-500/15 px-2 py-0.2 text-[8px] font-semibold uppercase tracking-widest text-sky-200 sm:inline-flex">
                  Preview
                </span>
              )}
            </span>
          </span>
          <h1 className={`font-semibold leading-tight transition-all duration-300 ${
            isScrolled ? 'text-xs sm:text-sm md:text-base' : 'text-sm sm:text-base md:text-lg'
          }`}>
            {displayName}
          </h1>
        </div>
      </button>

      {/* Desktop Navigation Links */}
      <div
        className={`hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-1 py-1 text-xs font-medium text-slate-100 shadow-inner shadow-white/10 transition-all duration-300 sm:text-sm md:flex ${
          isScrolled ? 'lg:flex' : 'md:flex'
        }`}
      >
        {navLinks.map((link) => (
          <button
            key={link.key}
            type="button"
            onClick={() => handleNavLinkClick(link)}
            className="group rounded-full px-3 py-1.5 transition hover:bg-white/15 sm:px-4"
          >
            <span className="block text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60 transition group-hover:text-white/90">
              {link.label}
            </span>
            <span className="mt-0.5 block text-[9px] font-medium uppercase tracking-[0.4em] text-white/30">
              {link.helper}
            </span>
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={() => setIsMobileNavOpen((prev) => !prev)}
          className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition md:hidden ${
            isMobileNavOpen ? 'bg-white/20' : 'hover:bg-white/20'
          }`}
          aria-label="Toggle navigation menu"
        >
          <span className="relative flex flex-col items-center justify-center gap-1.5">
            <span
              className={`block h-0.5 w-4 rounded bg-current transition-transform duration-200 ${
                isMobileNavOpen ? 'translate-y-1 rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-4 rounded bg-current transition-opacity duration-200 ${
                isMobileNavOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block h-0.5 w-4 rounded bg-current transition-transform duration-200 ${
                isMobileNavOpen ? '-translate-y-1 -rotate-45' : ''
              }`}
            />
          </span>
        </button>
       
        <button
          type="button"
          onClick={() => handleNavigate('/cart')}
          className={`relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 transition hover:from-cyan-300 hover:to-indigo-400 ${
            isScrolled
              ? 'h-10 w-10 text-[11px] sm:h-11 sm:w-11 sm:text-xs md:h-auto md:w-auto md:px-4 md:py-2 md:text-sm'
              : 'h-11 w-11 text-xs sm:h-12 sm:w-12 sm:text-sm md:h-auto md:w-auto md:px-4 md:py-2 md:text-sm'
          }`}
        >
          <span className="inline-flex md:hidden items-center justify-center">
            <FaBowlFood size={isScrolled ? 18 : 20} />
          </span>
          <span className="hidden md:inline font-semibold text-slate-900">View Cart</span>
          {itemCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white/95 text-[10px] font-bold text-slate-900 shadow sm:h-6 sm:w-6 sm:text-xs md:-top-2 md:-right-2">
              {itemCount > 9 ? '9+' : itemCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Navigation Panel */}
      {isMobileNavOpen && (
        <div className="absolute left-3 right-3 top-full z-50 mt-3 flex flex-col gap-2 rounded-2xl border border-white/10 bg-slate-950/95 p-4 text-sm shadow-[0_32px_60px_rgba(8,15,40,0.45)] backdrop-blur-xl md:hidden">
          {navLinks.map((link) => (
            <button
              key={link.key}
              type="button"
              onClick={() => handleNavLinkClick(link)}
              className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-2 text-left font-semibold text-slate-100 transition hover:bg-white/10"
            >
              <span>{link.label}</span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-white/40">{link.helper}</span>
            </button>
          ))}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleNavigate('/cart')}
              className="rounded-xl border border-white/15 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Cart ({itemCount})
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('/checkout')}
              className="rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 px-3 py-2 text-sm font-semibold text-slate-900 transition hover:from-cyan-300 hover:to-indigo-400"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
      </nav>
    </>
  );
};

export default MenuNavbar;