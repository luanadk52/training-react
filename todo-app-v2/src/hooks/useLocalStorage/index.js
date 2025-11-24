import { useState } from 'react';

// Custom hook that syncs state with localStorage
// Works just like useState but persists data across page reloads
function useLocalStorage(key, initialValue) {
  // Initialize state from localStorage if available
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  // Wrapped setter that also updates localStorage
  const setValue = (value) => {
    try {
      // Support functional updates like setState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;

