import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
};

// Actions
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const CLEAR_CART = 'CLEAR_CART';
const LOAD_CART = 'LOAD_CART';

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        };
      } else {
        const updatedItems = [...state.items, { ...action.payload }];
        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        };
      }

    case REMOVE_FROM_CART:
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: filteredItems,
        total: filteredItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: filteredItems.reduce((sum, item) => sum + item.quantity, 0),
      };

    case UPDATE_QUANTITY:
      const quantityUpdatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        ...state,
        items: quantityUpdatedItems,
        total: quantityUpdatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: quantityUpdatedItems.reduce((sum, item) => sum + item.quantity, 0),
      };

    case CLEAR_CART:
      return initialState;

    case LOAD_CART:
      return {
        ...action.payload,
        total: action.payload.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: action.payload.items.reduce((sum, item) => sum + item.quantity, 0),
      };

    default:
      return state;
  }
};

// Context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: LOAD_CART, payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify({
      items: state.items,
      total: state.total,
      itemCount: state.itemCount,
    }));
  }, [state]);

  // Actions
  const addToCart = (item) => {
    dispatch({ type: ADD_TO_CART, payload: item });
  };

  const removeFromCart = (id) => {
    dispatch({ type: REMOVE_FROM_CART, payload: id });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    dispatch({ type: UPDATE_QUANTITY, payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
