// src/services/restaurantService.js
export const API_BASE_URL = 'https://restaurantmenu-five.vercel.app/api';

export const fetchRestaurantMenuById = async (restaurantId) => {
  if (!restaurantId) {
    throw new Error('restaurantId is required to fetch restaurant menu data');
  }

  const endpoint = `${API_BASE_URL}/restaurants/menu-restaurant/${restaurantId}`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch restaurant menu: ${response.status} ${errorText}`);
  }

  return response.json();
};

