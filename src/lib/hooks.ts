import { useEffect, useState } from "react";

export const useDebounced = (value: string) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [value]);

  return debouncedValue;
};


export const usePaginate = () => {
  
}