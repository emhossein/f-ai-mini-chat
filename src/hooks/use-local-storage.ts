"use client";

import { useState, useEffect, useCallback } from "react";

// Helper function to read from localStorage
function getInitialStoredValue<T>(key: string, initialValue: T): T {
  if (typeof window === "undefined") {
    return initialValue; // For SSR
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    // console.warn(`Error reading localStorage key "${key}":`, error); // Avoid excessive logging for missing keys
    return initialValue;
  }
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return getInitialStoredValue(key, initialValue);
  });

  // Effect to update state if 'key' prop changes.
  // This is important for scenarios like user login/logout where the storage key might change.
  useEffect(() => {
    // When the key changes, re-read from localStorage for the new key.
    // The initialValue passed to getInitialStoredValue will be used if the new key isn't found.
    setStoredValue(getInitialStoredValue(key, initialValue));
    // Only re-run if the key changes. initialValue is used by getInitialStoredValue
    // if the key is not found in storage, or for the initial useState.
  }, [key]);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      if (typeof window === "undefined") {
        // If window is not defined, we are on the server.
        // We can't directly update localStorage, but we can update the React state.
        // This might be an issue if the state is expected to persist SSR -> CSR without re-fetching,
        // but for localStorage, it's inherently client-side.
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        return;
      }
      try {
        // We use a functional update for setStoredValue to ensure we have the latest state
        // if setValue is called multiple times in quick succession.
        setStoredValue((currentStoredValue) => {
          const valueToStore =
            value instanceof Function ? value(currentStoredValue) : value;
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          return valueToStore;
        });
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue], // Include storedValue if it's used in the functional update for server-side scenario
  );

  return [storedValue, setValue];
}
