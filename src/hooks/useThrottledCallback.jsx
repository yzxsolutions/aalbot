import { useRef, useEffect, useCallback } from "react";

export function useThrottledCallback(callback, delay) {
  const callbackRef = useRef(callback);
  const lastRanRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const throttledCallback = useCallback(
    (...args) => {
      const now = Date.now();
      if (now - lastRanRef.current >= delay) {
        callbackRef.current(...args);
        lastRanRef.current = now;
      } else {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          if (Date.now() - lastRanRef.current >= delay) {
            callbackRef.current(...args);
            lastRanRef.current = Date.now();
          }
        }, delay - (now - lastRanRef.current));
      }
    },
    [delay]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return throttledCallback;
}