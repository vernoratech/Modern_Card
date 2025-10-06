// src/pages/DigitalMenu/MenuHeader.jsx
import React from 'react';
const MenuHeader = ({ restaurant, stats, restaurantResponse }) => {
  const isPreviewMode = !restaurantResponse?.data;
  const responseData = restaurantResponse?.data ?? {};

  const cuisine = responseData.cuisine ?? restaurant?.cuisine ?? 'Chinese';
  const restaurantName = responseData.restaurantName ?? restaurant?.name ?? 'Brijesh fast food';
  const tagline = responseData.tagline ?? restaurant?.tagline ?? 'Discover chef-crafted dishes and seasonal specials, curated for every taste.';
  const contactNumber = responseData.restaurantContactNumber ?? restaurant?.phone ?? '+91 00000 00000';
  const address = responseData.restaurantAddress ?? restaurant?.address ?? '123 Gourmet Street, Culinary City';
  const cleanedPhone = contactNumber?.replace(/\D/g, '') || '';

  const highlights = [
    {
      label: 'Signature dishes',
      value: `${stats.totalItems}+`
    },
    {
      label: 'Cuisine styles',
      value: stats.categories
    },
    {
      label: 'Guest rating',
      value: `${stats.averageRating}/5`
    }
  ];

  return (
    <section id="menu-hero" className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 rounded-lg sm:rounded-xl md:rounded-2xl bg-slate-900 px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 text-white">
      <div className="space-y-2 sm:space-y-3 md:space-y-4 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <span className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] text-slate-300">{cuisine}</span>
          {isPreviewMode && (
            <span className="inline-flex items-center rounded-full bg-sky-500/20 text-sky-200 border border-sky-400/40 px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-widest">
              Preview Mode
            </span>
          )}
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight">{restaurantName}</h1>
        <p className="text-xs sm:text-sm md:text-base leading-relaxed text-slate-200 max-w-2xl">
          {tagline}
        </p>
      </div>

      <div className="mt-3 sm:mt-4 md:mt-6 flex flex-col gap-2 sm:gap-3 sm:flex-row sm:items-center justify-center sm:justify-start">
        <button
          type="button"
          className="w-full sm:w-auto rounded-full bg-sky-500 px-3 sm:px-4 md:px-5 py-2 sm:py-2 md:py-2.5 text-xs sm:text-sm font-semibold text-slate-900 transition hover:bg-sky-400 active:scale-95 min-h-[44px]"
          onClick={() => document.getElementById('menu-grid')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Browse Menu
        </button>
        <a
          href={cleanedPhone ? `tel:${cleanedPhone}` : '#'}
          className="w-full sm:w-auto rounded-full border border-white/20 px-3 sm:px-4 md:px-5 py-2 sm:py-2 md:py-2.5 text-center text-xs sm:text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10 active:scale-95 min-h-[44px]"
        >
          Call to Reserve
        </a>
      </div>

      <div className="mt-3 sm:mt-4 md:mt-6 space-y-1 sm:space-y-2 text-xs sm:text-sm text-slate-200">
        <p className="break-words">{contactNumber}</p>
        <p className="break-words">{address}</p>
      </div>
    </section>
  );
};

export default MenuHeader;
