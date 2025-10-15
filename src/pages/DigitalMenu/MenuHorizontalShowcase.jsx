// src/pages/DigitalMenu/MenuHorizontalShowcase.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MenuHorizontalShowcase = ({
  title = 'Handpicked for you',
  subtitle = 'Swipe to browse a few crowd favourites',
  items = [],
  onAdd,
  onItemClick,
  viewAllCategory,
}) => {
  const navigate = useNavigate();

  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  const handleViewAll = () => {
    const params = new URLSearchParams();
    if (viewAllCategory && viewAllCategory !== 'all') {
      params.set('category', viewAllCategory);
    }

    const search = params.toString();
    navigate(`/menu${search ? `?${search}` : ''}`);
  };

  return (
    <section data-showcase className="mt-10 sm:mt-12">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">{title}</h2>
          <p className="text-xs text-slate-500 sm:text-sm">{subtitle}</p>
        </div>
        <button
          type="button"
          onClick={handleViewAll}
          className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-600 transition hover:text-sky-500 cursor-pointer"
        >
          View all
        </button>
      </div>

      <div className="relative mt-5">
        <div
          data-showcase-track
          className="flex snap-x overflow-x-auto gap-4 sm:gap-5 pb-4 sm:pb-5 scroll-smooth"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {items.map((item) => (
            <article
              key={item.id}
              className="group snap-start w-48 flex-shrink-0 rounded-3xl border border-slate-200/60 bg-white/95 shadow-[0_18px_36px_rgba(15,23,42,0.12)] backdrop-blur transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_50px_rgba(15,23,42,0.18)] sm:w-56 md:w-60"
            >
              <div
                className="relative h-32 cursor-pointer overflow-hidden rounded-t-3xl"
                onClick={() => onItemClick?.(item)}
              >
                <img src={item.image} alt={item.name || item.itemName} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <span className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-slate-700 shadow-sm">
                  {item.tag ?? 'Chef pick'}
                </span>
              </div>
              <div className="flex flex-col gap-2 p-3">
                <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">{item.name || item.itemName}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">{item.currency || '₹'}{item.price}</span>
                  <span className="text-[11px] text-emerald-500 font-semibold">★ {item.rating ?? '4.7'}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onItemClick?.(item);
                      navigate(`/product/${item.id}`);
                    }}
                    className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800 cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    type="button"
                    onClick={() => onAdd?.(item)}
                    className="inline-flex flex-1 items-center justify-center rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-400 cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-1 left-0 w-3 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/85 to-transparent" />
        <div className="pointer-events-none absolute inset-y-1 right-0 w-3 bg-gradient-to-l from-[#f8fafc] via-[#f8fafc]/85 to-transparent" />
        <style>{`
          [data-showcase-track]::-webkit-scrollbar { display: none; }
          [data-showcase-track] { scrollbar-width: none; }
        `}</style>
      </div>
    </section>
  );
};

export default MenuHorizontalShowcase;
