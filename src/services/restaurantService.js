// src/services/restaurantService.js
export const API_BASE_URL = 'https://restaurantmenu-five.vercel.app/api';
// export const API_BASE_URL = 'http://localhost:5000/api';

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

export const fetchRestaurantMenuItems = async (restaurantId) => {
  if (!restaurantId) {
    throw new Error('restaurantId is required to fetch restaurant menu items');
  }

  const endpoint = `${API_BASE_URL}/restaurants/menu/getmenus/${restaurantId}/items`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch restaurant menu items: ${response.status} ${errorText}`);
  }

  return response.json();
};

export const fetchTableDetails = async (restaurantId, tableId) => {
  if (!restaurantId || !tableId) {
    throw new Error('Both restaurantId and tableId are required to fetch table details');
  }

  const endpoint = `${API_BASE_URL}/restaurants/menu/get-table/${restaurantId}/tables/${tableId}`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch table details: ${response.status} ${errorText}`);
  }

  return response.json();
};
