import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  const getStoredValue = () => {
    try {
      const storedItem = localStorage.getItem(key);
      if (!storedItem) return initialValue;
      return JSON.parse(storedItem);
    } catch (e) {
      return initialValue;
    }
  };

  const [state, setState] = useState(getStoredValue());
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      localStorage.removeItem(key);
    }
  }, [key, state]);

  return [state, setState];
}
