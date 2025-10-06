// src/context/RestaurantDataContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchRestaurantMenuById, fetchTableDetails } from '../services/restaurantService.js';

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

  const setIdentifiers = useCallback(({ restaurantId: newRestaurantId, tableId: newTableId }) => {
    setRestaurantId((prev) => newRestaurantId ?? prev);
    setTableId((prev) => (newTableId === undefined ? prev : newTableId));
  }, []);

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
