import {useRef, useEffect, useMemo} from 'react';
import _ from "lodash";

export const useDebounce = (callback: (searchedValue: string) => void, delay: number) => {
    const ref = useRef<any>();
  
    useEffect(() => {
      ref.current = callback;
    }, [callback]);
  
    const debouncedCallback = useMemo(() => {
      const func = (searchedValue: string) => { // Add searchedValue as a parameter
        ref.current?.(searchedValue); // Pass the searchedValue to ref.current
      };
  
      return _.debounce(func, delay);
    }, [delay]);
  
    return debouncedCallback;
  };