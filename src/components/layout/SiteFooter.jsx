// src/components/layout/SiteFooter.jsx
import React from 'react';

const currentYear = new Date().getFullYear();

const SiteFooter = () => {
  return (
    <footer className="relative overflow-hidden bg-[#f8fafc] text-slate-800 mb-2">
      <div className="pointer-events-none absolute inset-0 "></div>
      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-center rounded-3xl border border-white/60 bg-white/75 px-5 py-10 text-center  backdrop-blur-lg sm:px-10 lg:py-12">
        <span className="flex items-center gap-2 rounded-full border border-amber-200/80 bg-amber-100/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-amber-600">
          Brijesh Fast Food
        </span>
        <h3 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">Serving smiles since 2024</h3>
        <p className="mt-4 w-full max-w-3xl text-sm text-slate-600 sm:text-base">
          Order your favourites, enjoy seamless dining, and let us know how we can make your visit unforgettable.
        </p>

        <div className="mt-6 grid w-full gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500 sm:grid-cols-3 sm:text-[12px]">
          <div className="rounded-2xl border border-amber-200/70 bg-white/80 px-4 py-3 shadow-sm">Open daily 10am – 11pm</div>
          <div className="rounded-2xl border border-emerald-200/60 bg-white/80 px-4 py-3 shadow-sm">Phone: +91 98765 43210</div>
          <div className="rounded-2xl border border-sky-200/60 bg-white/80 px-4 py-3 shadow-sm">Email: hello@brijeshfastfood.com</div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-pink-200/70 bg-white/80 px-4 py-2 font-semibold text-pink-600 transition hover:-translate-y-0.5 hover:bg-pink-100">
            <span>📸</span> Instagram
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-white/80 px-4 py-2 font-semibold text-sky-600 transition hover:-translate-y-0.5 hover:bg-sky-100">
            <span>👍</span> Facebook
          </a>
          <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-white/80 px-4 py-2 font-semibold text-emerald-600 transition hover:-translate-y-0.5 hover:bg-emerald-100">
            <span>💬</span> WhatsApp
          </a>
        </div>

        <div className="mt-8 w-full border-t border-slate-200/60 pt-4 text-xs text-slate-500 sm:text-[13px]">
          © {currentYear} Brijesh Fast Food · Crafted with love for every diner.
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
