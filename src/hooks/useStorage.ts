import React from "react";

export function useLocalStorage<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
  if (process.browser) {
    return useStorage(key, defaultValue, window.localStorage);
  }
  const [cart, setCart] = React.useState<T>(defaultValue);
  return [cart, setCart, () => setCart(defaultValue)];
}

export function useSessionStorage<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
  if (process.browser) {
    return useStorage(key, defaultValue, window.sessionStorage);
  }
  const [cart, setCart] = React.useState<T>(defaultValue);
  return [cart, setCart, () => setCart(defaultValue)];
}

function useStorage<T>(
  key: string,
  defaultValue: T,
  storageObject: Storage
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
  const [value, setValue] = React.useState<T>(() => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    return defaultValue;
  });

  React.useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  const remove = React.useCallback(() => {
    setValue(defaultValue);
  }, []);

  return [value, setValue, remove];
}
