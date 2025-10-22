// src/pages/DigitalMenu/MenuHeader.jsx
import React from 'react';
import {
  IoStorefrontOutline,
  IoLocationOutline,
  IoCallOutline,
  IoTimeOutline,
  IoStarOutline
} from 'react-icons/io5';

const MenuHeader = ({ restaurant, stats, restaurantResponse }) => {
  const isPreviewMode = !restaurantResponse?.data;
  const responseData = restaurantResponse?.data ?? {};

  const cuisine = responseData.cuisine ?? restaurant?.cuisine ?? 'Chinese';
  const restaurantName = responseData.restaurantName ?? restaurant?.name ?? 'Brijesh fast food';
  const tagline = responseData.tagline ?? restaurant?.tagline ?? 'Discover chef-crafted dishes and seasonal specials';
  const contactNumber = responseData.restaurantContactNumber ?? restaurant?.phone ?? '+91 00000 00000';
  const address = responseData.restaurantAddress ?? restaurant?.address ?? '123 Gourmet Street, Culinary City';
  const hours = responseData.hours ?? restaurant?.hours ?? 'Mon-Sun: 10AM - 11PM';

  const cleanedPhone = contactNumber?.replace(/\D/g, '') || '';

  const highlights = [
    { label: 'Dishes', value: `${stats.totalItems}+` },
    { label: 'Categories', value: stats.categories },
    { label: 'Rating', value: `${stats.averageRating}/5` }
  ];

  return (
    <section className="relative mt-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-8 text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-teal-600/10" />
      <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-teal-400/20 rounded-full blur-3xl" />

      <div className="relative space-y-6 text-center">
        {/* Preview Badge */}
        {isPreviewMode && (
          <span className="inline-flex items-center rounded-full bg-sky-500/20 text-sky-200 border border-sky-400/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide">
            <span className="w-2 h-2 bg-sky-400 rounded-full mr-2 animate-pulse"></span>
            Preview Mode
          </span>
        )}

        {/* Cuisine Badge */}
        <span className="inline-flex items-center px-6 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-sm uppercase tracking-wider text-emerald-200 font-semibold">
          ✨ {cuisine} Cuisine ✨
        </span>

        {/* Restaurant Name */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold flex items-center justify-center gap-2">
          <IoStorefrontOutline className="text-emerald-400 text-4xl drop-shadow-lg" />
          <span className="bg-gradient-to-r from-white to-slate-100 bg-clip-text text-transparent font-extrabold">
            {restaurantName.toUpperCase()}
          </span>
          <IoStorefrontOutline className="text-emerald-400 text-4xl drop-shadow-lg" />
        </h1>

        {/* Tagline */}
        <p className="text-sm sm:text-base text-slate-300 font-medium max-w-2xl mx-auto px-4">
          {tagline}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-6">
          {highlights.map((highlight, index) => (
            <div key={index} className="flex flex-col items-center px-4 py-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                {highlight.value}
              </span>
              <span className="text-xs text-slate-400 font-medium uppercase">
                {highlight.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuHeader;
