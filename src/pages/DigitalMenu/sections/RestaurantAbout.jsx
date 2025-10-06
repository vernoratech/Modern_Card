// src/pages/DigitalMenu/sections/RestaurantAbout.jsx
import React from 'react';

const RestaurantAbout = () => {
  const highlights = [
    { label: 'Founded', value: '2001' },
    { label: 'Cuisine', value: 'Indo-Chinese & Street Classics' },
    { label: 'Seating', value: '80 indoor · 20 patio' },
    { label: 'Service Hours', value: '11:00 AM – 1:00 AM daily' },
  ];

  const servicePillars = [
    {
      title: 'Speed-first kitchen',
      body: 'Average prep time under 12 minutes with live wok stations and tandoors designed for volume service.',
    },
    {
      title: 'Table QR ordering',
      body: 'Scan-and-pay workflow with real-time order board ensures contactless, queue-free dining.',
    },
    {
      title: 'Community nights',
      body: 'Live indie gigs every Friday, plus monthly chef pop-ups showcasing regional snacks.',
    },
  ];

  const gallery = [
    {
      title: 'Signature combo platter',
      subtitle: 'Crispy chilli potatoes · Schezwan fried rice · Honey sesame cauliflower',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
    },
    {
      title: 'Late-night chai bar',
      subtitle: 'Masala kadak chai with khari biscuits prepped past midnight',
      image: 'https://images.unsplash.com/photo-1527169402691-feff5539e52c?w=800&h=600&fit=crop',
    },
  ];

  const quickLinks = [
    { label: 'Table reservations', href: '#reservations' },
    { label: 'Corporate catering', href: '#catering' },
    { label: 'Franchise deck', href: '#franchise' },
    { label: 'Press kit', href: '#press' },
  ];

  return (
    <section className="mb-6 rounded-3xl border border-slate-800/10 bg-white/95 p-4 shadow-sm backdrop-blur md:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">About</span>
            <span className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-amber-700">
              Prototype
            </span>
          </div>
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">Brijesh Fast Food</h2>
          <p className="text-sm text-slate-600 sm:text-base">
            Serving bold street flavors since 2001, Brijesh Fast Food brings classic Indo-Chinese signatures, sizzling tandoori grills, and all-day chai favourites to your table. Expect quick service, late-night specials, and a menu that keeps regulars coming back.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 sm:text-sm">
          {highlights.map(({ label, value }) => (
            <div key={label} className="rounded-2xl border border-slate-200/60 bg-slate-50/70 px-3 py-2 text-center">
              <p className="uppercase tracking-[0.25em] text-[10px] text-slate-400">{label}</p>
              <p className="mt-1 text-sm font-semibold text-slate-800 sm:text-base">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/60 bg-slate-50/70 p-4">
          <h3 className="text-sm font-semibold text-slate-800 sm:text-base">Contact</h3>
          <div className="mt-2 space-y-2 text-sm text-slate-600">
            <a
              href="tel:+913428750986"
              className="flex items-center gap-2 rounded-xl border border-transparent px-2 py-1 transition hover:border-slate-300 hover:bg-white"
            >
              <span className="rounded-md bg-sky-500/15 px-2 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-sky-500">
                Call
              </span>
              <span>+91 34287 50986</span>
            </a>
            <a
              href="mailto:hello@brijeshfastfood.com"
              className="flex items-center gap-2 rounded-xl border border-transparent px-2 py-1 transition hover:border-slate-300 hover:bg-white"
            >
              <span className="rounded-md bg-emerald-500/15 px-2 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
                Email
              </span>
              <span>hello@brijeshfastfood.com</span>
            </a>
            <div className="flex items-start gap-2 rounded-xl border border-transparent px-2 py-1">
              <span className="rounded-md bg-indigo-500/15 px-2 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">
                Visit
              </span>
              <span className="text-sm text-slate-600">
                Main Hall, Center Plaza, Sector 21, New Delhi
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-transparent px-2 py-1">
              <span className="rounded-md bg-rose-500/15 px-2 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-rose-600">
                Orders
              </span>
              <span>Scan the on-table QR to order directly</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/60 bg-slate-50/70 p-4">
          <h3 className="text-sm font-semibold text-slate-800 sm:text-base">Our story</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            The modern Brijesh experience began as a late-night noodle cart and soon evolved into a multi-outlet brand. The core team still hand-picks every ingredient at dawn markets, keeping the menu fresh, fast, and full of nostalgia.
          </p>
          <div className="mt-3 space-y-2">
            {servicePillars.map(({ title, body }) => (
              <div key={title} className="rounded-2xl border border-transparent bg-white/90 p-3 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">{title}</p>
                <p className="mt-1 text-sm text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {gallery.map(({ image, title, subtitle }) => (
          <figure key={title} className="overflow-hidden rounded-3xl border border-slate-200/50 bg-slate-50/70 shadow-sm">
            <div className="relative h-48 w-full overflow-hidden sm:h-56">
              <img
                src={image}
                alt={title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <figcaption className="p-4">
              <p className="text-sm font-semibold text-slate-800">{title}</p>
              <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {quickLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-white"
            >
              {label}
            </a>
          ))}
        </div>
        <a
          href="https://modern-card-wheat.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-sky-400"
        >
          Preview live menu
          <span className="text-[10px] uppercase tracking-[0.3em] text-sky-100">Modern Card</span>
        </a>
      </div>
    </section>
  );
};

export default RestaurantAbout;
