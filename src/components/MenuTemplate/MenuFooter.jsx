// src/components/MenuTemplate/MenuFooter.jsx
import React from 'react'

const MenuFooter = ({ restaurant }) => {
  const currentDay = new Date().toLocaleLowerCase()
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const today = days[new Date().getDay()]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Restaurant Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={restaurant.logo}
                alt={restaurant.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <h3 className="text-xl font-bold">{restaurant.name}</h3>
            </div>
            <p className="text-gray-300 mb-4">{restaurant.tagline}</p>
            <div className="space-y-2 text-sm text-gray-400">
              <p className="flex items-center">
                <span className="mr-2">📍</span>
                {restaurant.address}
              </p>
              <p className="flex items-center">
                <span className="mr-2">📞</span>
                {restaurant.phone}
              </p>
              <p className="flex items-center">
                <span className="mr-2">✉️</span>
                {restaurant.email}
              </p>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Opening Hours</h3>
            <div className="space-y-2 text-sm">
              {Object.entries(restaurant.timing).map(([day, time]) => (
                <div 
                  key={day}
                  className={`flex justify-between ${
                    day === today ? 'text-green-400 font-medium' : 'text-gray-300'
                  }`}
                >
                  <span className="capitalize">{day}</span>
                  <span>{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media & Quick Actions */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="space-y-3">
              {restaurant.socialMedia.whatsapp && (
                <a
                  href={`https://wa.me/${restaurant.socialMedia.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
                >
                  <span>📱</span>
                  <span>WhatsApp: {restaurant.socialMedia.whatsapp}</span>
                </a>
              )}
              
              {restaurant.socialMedia.instagram && (
                <a
                  href={`https://instagram.com/${restaurant.socialMedia.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors"
                >
                  <span>📸</span>
                  <span>Instagram: {restaurant.socialMedia.instagram}</span>
                </a>
              )}
              
              {restaurant.socialMedia.facebook && (
                <a
                  href={`https://facebook.com/${restaurant.socialMedia.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>📘</span>
                  <span>Facebook: {restaurant.socialMedia.facebook}</span>
                </a>
              )}
            </div>

            {/* Quick Order Button */}
            <div className="mt-6">
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                📞 Call to Order Now
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 {restaurant.name}. All rights reserved.</p>
          <p className="mt-1">Powered by VesnoraTech Restaurant Solutions</p>
        </div>
      </div>
    </footer>
  )
}

export default MenuFooter
