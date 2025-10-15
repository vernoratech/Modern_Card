// src/context/RestaurantDataContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchRestaurantMenuById, fetchTableDetails, fetchRestaurantMenuItems } from '../services/restaurantService.js';

const RestaurantDataContext = createContext(null);

export const RestaurantDataProvider = ({ children }) => {
  const [restaurantId, setRestaurantId] = useState(null);
  const [restaurantResponse, setRestaurantResponse] = useState(null);
  const [restaurantError, setRestaurantError] = useState(null);
  const [restaurantLoading, setRestaurantLoading] = useState(false);

  const [tableId, setTableId] = useState(null);
  const [tableResponse, setTableResponse] = useState(null);
  const [tableError, setTableError] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);

  const [restaurantMenuItemsId, setRestaurantMenuItemsId] = useState(null);
  const [restaurantMenuItemsResponse, setRestaurantMenuItemsResponse] = useState(null);
  const [restaurantMenuItemsError, setRestaurantMenuItemsError] = useState(null);
  const [restaurantMenuItemsLoading, setRestaurantMenuItemsLoading] = useState(false);

  const setIdentifiers = useCallback(({ restaurantId: newRestaurantId, tableId: newTableId, restaurantMenuItemsId: newRestaurantMenuItemsId }) => {
    setRestaurantId((prev) => newRestaurantId ?? prev);
    setTableId((prev) => (newTableId === undefined ? prev : newTableId));
    setRestaurantMenuItemsId((prev) => (newRestaurantMenuItemsId === undefined ? prev : newRestaurantMenuItemsId));
  }, []);

  //Restaurant Data fetch
  useEffect(() => {
    if (!restaurantId) {
      return;
    }

    let isActive = true;
    const loadRestaurant = async () => {
      try {
        setRestaurantLoading(true);
        const response = await fetchRestaurantMenuById(restaurantId);
        if (!isActive) {
          return;
        }
        setRestaurantResponse(response);
        setRestaurantError(null);
      } catch (error) {
        if (!isActive) {
          return;
        }
        setRestaurantError(error);
      } finally {
        if (isActive) {
          setRestaurantLoading(false);
        }
      }
    };

    loadRestaurant();

    return () => {
      isActive = false;
    };
  }, [restaurantId]);

  //Table Data fetch
  useEffect(() => {
    if (!restaurantId || !tableId) {
      setTableResponse(null);
      setTableError(null);
      setTableLoading(false);
      return;
    }

    let isActive = true;
    const loadTable = async () => {
      try {
        setTableLoading(true);
        const response = await fetchTableDetails(restaurantId, tableId);
        if (!isActive) {
          return;
        }
        setTableResponse(response);
        setTableError(null);
      } catch (error) {
        if (!isActive) {
          return;
        }
        setTableError(error);
      } finally {
        if (isActive) {
          setTableLoading(false);
        }
      }
    };

    loadTable();

    return () => {
      isActive = false;
    };
  }, [restaurantId, tableId]);

  //Restaurant Menu Items fetch
  useEffect(() => {
    if (!restaurantId) {
      return;
    }

    let isActive = true;
    const loadRestaurantMenuItems = async () => {
      try {
        setRestaurantMenuItemsLoading(true);
        const response = await fetchRestaurantMenuItems(restaurantId);
        if (!isActive) {
          return;
        }
        setRestaurantMenuItemsResponse(response);
        setRestaurantMenuItemsError(null);
      } catch (error) {
        if (!isActive) {
          return;
        }
        setRestaurantMenuItemsError(error);
      } finally {
        if (isActive) {
          setRestaurantMenuItemsLoading(false);
        }
      }
    };

    loadRestaurantMenuItems();

    return () => {
      isActive = false;
    };
  }, [restaurantId]);

  const value = {
    restaurantId,
    restaurantResponse,
    restaurantError,
    restaurantLoading,
    tableId,
    tableResponse,
    tableError,
    tableLoading,
    setIdentifiers,
    restaurantMenuItemsId,
    restaurantMenuItemsResponse,
    restaurantMenuItemsError,
    restaurantMenuItemsLoading,
  };

  return (
    <RestaurantDataContext.Provider value={value}>
      {children}
    </RestaurantDataContext.Provider>
  );
};

export const useRestaurantData = () => {
    const context = useContext(RestaurantDataContext);
    if (!context) {
      throw new Error('useRestaurantData must be used within a RestaurantDataProvider');
    }
    return context;
};
