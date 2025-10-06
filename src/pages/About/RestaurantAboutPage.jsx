// src/pages/About/RestaurantAboutPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import RestaurantAbout from '../DigitalMenu/sections/RestaurantAbout.jsx';

const RestaurantAboutPage = () => {
  return (
    <div className="about-page bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-8 sm:py-10 md:py-12">
        <div className="mb-4 sm:mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-white/80 sm:px-4 sm:py-2 sm:text-sm"
          >
            <span className="text-base">←</span>
            <span className="tracking-normal">Back to Menu</span>
          </Link>
        </div>
        <header className="mb-6 sm:mb-8 md:mb-10 flex flex-col gap-3 text-slate-800">
          <span className="inline-flex w-fit items-center rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-sky-600">
            About the brand
          </span>
          <h1 className="text-2xl font-semibold sm:text-3xl md:text-4xl">
            Discover the Brijesh Fast Food experience
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
            A standalone profile page that showcases our prototype content for the restaurant. We will wire this page to live back-end data in a later milestone.
          </p>
        </header>

        <RestaurantAbout />
      </div>
    </div>
  );
};

export default RestaurantAboutPage;
