import { useRef, useCallback } from "react";

const useThrottle = (callback: () => void, delay: number) => {
  const lastCallRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(() => {
    const now = Date.now();

    if (!lastCallRef.current || now - lastCallRef.current >= delay) {
      lastCallRef.current = now;
      callback();
    } else if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        lastCallRef.current = Date.now();
        callback();
        timeoutRef.current = null;
      }, delay - (now - lastCallRef.current));
    }
  }, [callback, delay]);
};

export default useThrottle;
