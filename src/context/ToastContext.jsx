// src/context/ToastContext.jsx
import React, { createContext, useContext, useCallback, useMemo, useRef, useState } from 'react';

const ToastContext = createContext(null);

const DEFAULT_DURATION = 4000;

const generateToast = ({ type = 'info', title, message, duration = DEFAULT_DURATION, position = 'top-right' }) => ({
  id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`,
  type,
  title,
  message,
  duration,
  position,
});

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef(new Map());

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const enqueueToast = useCallback((config) => {
    const toast = generateToast(config);
    setToasts((prev) => [...prev, toast]);

    if (toast.duration > 0) {
      const timer = setTimeout(() => removeToast(toast.id), toast.duration);
      timersRef.current.set(toast.id, timer);
    }

    return toast.id;
  }, [removeToast]);

  const value = useMemo(() => ({
    toasts,
    addToast: enqueueToast,
    removeToast,
  }), [toasts, enqueueToast, removeToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
