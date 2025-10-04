// src/pages/DigitalMenu/MenuHeader.jsx
import React from 'react';
const MenuHeader = ({ restaurant, stats, restaurantResponse }) => {
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
        <span className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] text-slate-300">{restaurantResponse?.data?.cuisine}</span>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight">{restaurantResponse?.data?.restaurantName}</h1>
        <p className="text-xs sm:text-sm md:text-base leading-relaxed text-slate-200 max-w-2xl">
          {restaurantResponse?.data?.tagline}
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
          href={`tel:${restaurant.phone.replace(/\D/g, '')}`}
          className="w-full sm:w-auto rounded-full border border-white/20 px-3 sm:px-4 md:px-5 py-2 sm:py-2 md:py-2.5 text-center text-xs sm:text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10 active:scale-95 min-h-[44px]"
        >
          Call to Reserve
        </a>
      </div>

      <div className="mt-3 sm:mt-4 md:mt-6 space-y-1 sm:space-y-2 text-xs sm:text-sm text-slate-200">
        <p className="break-words">{restaurantResponse?.data?.restaurantContactNumber}</p>
        <p className="break-words">{restaurantResponse?.data?.restaurantAddress}</p>
      </div>

      <div className="mt-4 sm:mt-5 md:mt-6 lg:mt-8 grid gap-2 sm:gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {highlights.map((highlight) => (
          <div
            key={highlight.label}
            className="rounded-md sm:rounded-lg md:rounded-xl border border-white/10 p-2 sm:p-3 md:p-4 text-center text-slate-100 min-h-[80px] sm:min-h-[90px] flex flex-col justify-center"
          >
            <p className="text-base sm:text-lg md:text-xl font-semibold leading-tight">{highlight.value}</p>
            <p className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-300">{highlight.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuHeader;
